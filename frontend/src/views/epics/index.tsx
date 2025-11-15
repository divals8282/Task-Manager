import { Button } from "@/components/ui/button";

export const EpicsView = () => {
  return (
    <div className="epics-view">
      <div className="epics-view__header">
        <div className="epics-view__header--title">Epics</div>
        <div className="epics-view__header__actions">
          <Button>Create Epic</Button>
        </div>
      </div>
      <div className="epics-view__body">Epics Gonna be rendered here</div>
    </div>
  );
};
