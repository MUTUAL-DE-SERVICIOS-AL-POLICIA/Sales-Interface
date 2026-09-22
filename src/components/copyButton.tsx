"use client";

import { Button, Tooltip } from "@heroui/react";
import { useCallback } from "react";

import { CopyIcon } from "@/components/icons";

interface Props {
  text: string | undefined;
}

export const CopyButton = ({ text = "" }: Props) => {
  const handleCopy = useCallback(async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);

        return;
      } catch {
        return false;
      }
    }

    try {
      const textarea = document.createElement("textarea");

      textarea.value = text;

      Object.assign(textarea.style, {
        position: "fixed",
        left: "-999999px",
        top: "-999999px",
        opacity: "0",
      });

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      document.execCommand("copy");

      textarea.remove();
    } catch {
      return false;
    }
  }, [text]);

  return (
    <Tooltip delay={0}>
      <Button isIconOnly size="sm" variant="ghost" onPress={handleCopy}>
        <CopyIcon />
      </Button>
      <Tooltip.Content showArrow placement="right">
        <Tooltip.Arrow />
        Copiar
      </Tooltip.Content>
    </Tooltip>
  );
};
