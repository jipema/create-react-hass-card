import { useCallback, useState } from "react";
import { CardDialog, CardDialogProps } from "./CardDialog";
import { HassCardProps } from "./createReactHassCard";

type CardWrapperProps = HassCardProps & {
  Component: React.FC<
    HassCardProps & {
      openDialog: (dialogParams: CardDialogProps) => void;
      closeDialog: () => void;
      openEntityMoreInfo: (entityId: string) => void;
      closeEntityMoreInfo: () => void;
    } & unknown
  >;
};

export function CardWrapper({ Component, ...props }: CardWrapperProps) {
  const [dialog, setDialog] = useState<CardDialogProps | null>(null);

  const handleOpenDialog = useCallback((dialogProps: CardDialogProps) => {
    setDialog(dialogProps);
  }, []);
  const handleCloseDialog = useCallback(() => setDialog(null), []);

  const handleOpenEntityMoreInfo = useCallback(() => {
    const haEl = document.querySelector("home-assistant");
    if (!haEl) return;

    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: "switch.dashboard_monitor" },
    });
    haEl.dispatchEvent(event);
  }, []);
  const handleCloseEntityMoreInfo = useCallback(() => {
    const haEl = document.querySelector("home-assistant");
    if (!haEl) return;

    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: null },
    });
    haEl.dispatchEvent(event);
  }, []);

  return (
    <>
      {!!dialog && <CardDialog {...dialog} />}
      <Component
        {...props}
        openDialog={handleOpenDialog}
        closeDialog={handleCloseDialog}
        openEntityMoreInfo={handleOpenEntityMoreInfo}
        closeEntityMoreInfo={handleCloseEntityMoreInfo}
      />
    </>
  );
}