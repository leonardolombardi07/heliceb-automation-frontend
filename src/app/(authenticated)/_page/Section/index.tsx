"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IDIcon from "@mui/icons-material/Link";
import Link from "next/link";
import TextField from "@mui/material/TextField";

export function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      {children}
    </Box>
  );
}

export function SectionTitle({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
      }}
    >
      <Typography id={id} variant="h4" component="h2">
        {children}
      </Typography>

      <Box
        sx={{
          "&:hover": {
            color: (t) => t.palette.primary.main,
          },
        }}
      >
        <Link
          href={`#${id}`}
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <IDIcon sx={{ mt: 1 }} />
        </Link>
      </Box>
    </Box>
  );
}
