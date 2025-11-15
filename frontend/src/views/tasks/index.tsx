import { Button } from "@/components/ui/button";

export const TasksView = () => {
  return (
    <div className="stories-view">
      <div className="stories-view__header">
        <div className="stories-view__header--title">Tasks</div>
        <div className="stories-view__header__actions">
          <Button>Create Task</Button>
        </div>
      </div>
      <div className="stories-view__body">Tasks Gonna be rendered here</div>
    </div>
  );
};
