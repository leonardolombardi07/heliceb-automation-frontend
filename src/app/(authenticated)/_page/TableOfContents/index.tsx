import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export interface TocItem {
  text: string;
  hash: string;
  children: TocItem[];
}

const Nav = styled("nav")(({ theme }) => ({
  paddingLeft: 6, // Fix truncated focus outline style
  position: "sticky",
  height: "100vh",
  top: 0,
  overflowY: "auto",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(7),
  paddingRight: theme.spacing(4), // We can't use `padding` as stylis-plugin-rtl doesn't swap it
  display: "none",
  scrollbarWidth: "thin",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

const NavLabel = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 0, 1, 1.4),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: "uppercase",
  letterSpacing: ".1rem",
  // color: theme.palette.text.tertiary,
}));

const NavList = styled(Typography)<{ component?: string; as?: string }>({
  padding: 0,
  margin: 0,
  listStyle: "none",
});

interface NavItemProps {
  active: boolean;
  secondary: boolean;
  secondarySubItem: boolean;
  // theme: Theme;
}

const NavItem = styled(Link, {
  shouldForwardProp: (prop) =>
    prop !== "active" && prop !== "secondary" && prop !== "secondarySubItem",
})<NavItemProps>(({ active, secondary, secondarySubItem, theme }) => {
  const activeStyles = {
    borderLeftColor: alpha(theme.palette.secondary.main, 0.95),
    color: alpha(theme.palette.secondary.main, 0.95),
    "&:hover": {
      borderLeftColor: alpha(theme.palette.secondary.main, 1),
      color: alpha(theme.palette.secondary.main, 1),
    },
  };

  let paddingLeft: string | number = "12px";
  if (secondary) {
    paddingLeft = 3;
  }
  if (secondarySubItem) {
    paddingLeft = 4.5;
  }

  return [
    {
      boxSizing: "border-box",
      padding: theme.spacing("6px", 0, "6px", paddingLeft),
      borderLeft: `1px solid transparent`,
      display: "block",
      fontSize: theme.typography.pxToRem(13),
      fontWeight: theme.typography.fontWeightMedium,
      textOverflow: "ellipsis",
      overflow: "hidden",
      "&:hover": {
        borderLeftColor: theme.palette.grey[400],
        color: theme.palette.grey[600],
      },
      ...(!active && {
        color: theme.palette.text.primary,
      }),
      // TODO: We probably want `aria-current="location"` instead.
      ...(active && activeStyles),
      "&:active": activeStyles,
    },
  ];
});

interface TableOfContentsProps {
  toc: TocItem[];
}

export default function TableOfContents(props: TableOfContentsProps) {
  const { toc } = props;

  const items = React.useMemo(() => flatten(toc), [toc]);
  const [activeState, setActiveState] = React.useState<string | null>(null);
  const clickedRef = React.useRef<boolean>(false);
  const unsetClickedRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active;
    for (let i = items.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 100) {
        active = { hash: null };
        break;
      }

      const item = items[i];
      const node = document.getElementById(item.hash);

      if (process.env.NODE_ENV !== "production") {
        if (!node) {
          console.error(
            `Missing node on the item ${JSON.stringify(item, null, 2)}`
          );
        }
      }

      if (
        node &&
        node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, items]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(items.length > 0 ? findActiveIndex : noop, 166);

  const handleClick =
    (hash: string) =>
    (
      event:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.KeyboardEvent<HTMLAnchorElement>
    ) => {
      // Ignore click events meant for native link handling, for example open in new tab
      if (samePageLinkNavigation(event)) {
        return;
      }

      // Used to disable findActiveIndex if the page scrolls due to a click
      clickedRef.current = true;

      unsetClickedRef.current = setTimeout(() => {
        clickedRef.current = false;
      }, 1000);

      if (activeState !== hash) {
        setActiveState(hash);
      }
    };

  React.useEffect(
    () => () => {
      if (unsetClickedRef.current) {
        clearTimeout(unsetClickedRef.current);
      }
    },
    []
  );

  const itemLink = (
    item: TocItem,
    secondary = false,
    secondarySubItem = false
  ) => (
    <NavItem
      display="block"
      href={`#${item.hash}`}
      underline="none"
      onClick={handleClick(item.hash)}
      active={activeState === item.hash}
      secondary={secondary}
      secondarySubItem={secondarySubItem}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </NavItem>
  );

  return (
    <Nav>
      {toc.length > 0 ? (
        <React.Fragment>
          <NavLabel>Seções</NavLabel>
          <NavList component="ul">
            {toc.map((item) => (
              <li key={item.text}>
                {itemLink(item)}
                {item.children.length > 0 ? (
                  <NavList as="ul">
                    {item.children.map((subitem) => (
                      <li key={subitem.text}>
                        {itemLink(subitem, true)}
                        {subitem.children?.length > 0 ? (
                          <NavList as="ul">
                            {subitem.children.map((nestedSubItem) => (
                              <li key={nestedSubItem.text}>
                                {itemLink(nestedSubItem, false, true)}
                              </li>
                            ))}
                          </NavList>
                        ) : null}
                      </li>
                    ))}
                  </NavList>
                ) : null}
              </li>
            ))}
          </NavList>
        </React.Fragment>
      ) : null}
    </Nav>
  );
}

function useThrottledOnScroll(callback: () => void | null, delay: number) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : null),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === null) {
      return undefined;
    }

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

interface ThrottleFunctionWithCancel {
  (): any;
  cancel: () => void;
}

function throttle(
  callback: () => void,
  delay: number
): ThrottleFunctionWithCancel {
  let last = 0;
  let timeout: NodeJS.Timeout;

  function throttledCallback() {
    const now = Date.now();
    if (now >= last + delay) {
      last = now;
      callback();
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        last = now;
        callback();
      }, delay);
    }
  }

  throttledCallback.cancel = () => {
    clearTimeout(timeout);
  };

  return throttledCallback as ThrottleFunctionWithCancel;
}

function flatten(headings: TocItem[]) {
  const itemsWithNode: any[] = [];

  headings.forEach((item: any) => {
    itemsWithNode.push(item);

    if (item.children.length > 0) {
      item.children.forEach((subitem: TocItem) => {
        itemsWithNode.push(subitem);
      });
    }
  });
  return itemsWithNode;
}

const noop = () => {};

export function samePageLinkNavigation(
  event:
    | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    | React.KeyboardEvent<HTMLAnchorElement>
) {
  if (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return true;
  }
  return false;
}
