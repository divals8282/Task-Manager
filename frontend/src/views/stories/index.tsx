import "./styles.scss";
import { type ItemStoryI } from "@/server/item/types";

import { Button } from "@/components/ui/button";
import { getItemsServer } from "@/server/item/get-items";
import { useEffect, useState } from "react";
import { StoryDialog } from "./story-dialog";

export const StoriesView = () => {
  const [storyDialog, setStoryDialog] = useState<{
    data: ItemStoryI;
    isOpen: boolean;
  }>({
    data: {
      description: "",
      name: "",
      id: undefined,
    },
    isOpen: false,
  });

  const [stories, setStories] = useState<ItemStoryI[]>([]);

  const getAndSetServerData = async () => {
    const response = await getItemsServer("Story");
    setStories(response.data);
    return true;
  };

  useEffect(() => {
    getAndSetServerData();
  }, []);

  return (
    <div className="stories-view">
      <div className="stories-view__header">
        <div className="stories-view__header--title">Stories</div>
        <div className="stories-view__header__actions">
          <Button
            onClick={() =>
              setStoryDialog({
                data: {
                  description: "",
                  name: "",
                  id: undefined,
                },
                isOpen: true,
              })
            }
          >
            Create Story
          </Button>
        </div>
      </div>
      <div className="stories-view__body">
        {stories.map((story) => (
          <div
            className="stories-view__body__story"
            key={story.id}
            onClick={() =>
              setStoryDialog({
                isOpen: true,
                data: story,
              })
            }
          >
            {story.name} --EPIC: {story.epic ? story.epic.name : "None"}
          </div>
        ))}
      </div>
      <StoryDialog
        isOpen={storyDialog.isOpen}
        data={storyDialog.data}
        onDataChange={(data) => setStoryDialog({ ...storyDialog, data })}
        onDialogRequestToClose={() => {
          setStoryDialog({ ...storyDialog, isOpen: false });
          getAndSetServerData();
        }}
      />
    </div>
  );
};
