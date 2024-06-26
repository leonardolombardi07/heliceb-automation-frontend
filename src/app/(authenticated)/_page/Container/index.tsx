import * as React from "react";
import { styled } from "@mui/material/styles";
import MUIContainer, { ContainerProps } from "@mui/material/Container";

const StyledMUIContainer = styled(MUIContainer)(({ theme }) => {
  return {
    paddingTop: `calc(var(--MuiDocs-header-height) + ${theme.spacing(4)})`,
    // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
    // 105ch ≈ 930px
    fontFamily: "Arial",
    maxWidth: "105ch",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  };
});

export default function Container(props: ContainerProps) {
  return <StyledMUIContainer id="main-content" maxWidth={false} {...props} />;
}
