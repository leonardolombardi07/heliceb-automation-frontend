import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { FormValues } from "../../types";

const BUTTON_TEXT = "Gerar Planilha";

interface HeaderProps {
  onGenerateExcel: () => void;
}

export default function Header({ onGenerateExcel }: HeaderProps) {
  const fadeIn = useFadeInWhenOnTopAndFadeWhenNot();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        bgcolor: (t) => t.palette.background.default,
        zIndex: 1000,
        mt: 5,
        p: 2,
      }}
    >
      <Typography variant="h3">Hélice B</Typography>
      <Fade
        in={fadeIn}
        unmountOnExit
        timeout={{
          enter: 500,
          exit: 200,
        }}
      >
        <Typography variant="subtitle1">
          Automatização da variação de parâmetros de input utilizados na
          planilha <b>Hélice B</b> do professor Alexandre Alho. Editando-se os
          parâmetros no formulário abaixo e clicando no botão{" "}
          <b>{BUTTON_TEXT}</b>, o programa gera um Excel com uma lista de
          propulsores (com suas características, como empuxo entregue, kt, kq,
          etc...), ordenados por eficiência, dentro das restrições impostas.
        </Typography>
      </Fade>

      <Button
        variant="contained"
        onClick={() => onGenerateExcel()}
        sx={{ mt: 2 }}
      >
        {BUTTON_TEXT}
      </Button>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}

function useFadeInWhenOnTopAndFadeWhenNot() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return !trigger;
}
