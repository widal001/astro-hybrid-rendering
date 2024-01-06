import { useState, useEffect } from "react";
import TileButton from "@/components/ui/tile-button";
import CardItem from "@/components/CardItem";
import type { CardProps } from "@/types";

interface CardListProps {
  tags: string[];
  items: CardProps[];
}

function filterItemsByTags(
  items: CardProps[],
  activeTags: string[]
): CardProps[] {
  // if no tags are active return all items
  if (activeTags.length === 0) {
    return items;
  }
  // otherwise return only the items that have at least one badge
  // that is included in the list of activeTags
  return items.filter((item) =>
    item.badges.some((badge) => activeTags.includes(badge))
  );
}

export default function CardList({ tags, items }: CardListProps) {
  // register variables to store the list of activeTags and filteredItems
  // as well as the functions to update the values of those variables
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<CardProps[]>(items);

  useEffect(() => {
    // Get the current URL and remove existing 'tags' parameters
    const currentUrl = new URL(window.location.href);
    // Get all values for the 'tags' query parameter
    const tagsQueryParams = currentUrl.searchParams.getAll("tags");
    if (tagsQueryParams.length > 0) {
      // Update the activeTags state with the list of 'tags'
      setActiveTags(tagsQueryParams);
      setFilteredItems(filterItemsByTags(items, tagsQueryParams));
    }
  }, []); // Empty dependency array to run the effect once on mount

  const handleTagClick = (tag: string) => {
    // update the list of active tags based on whether or not
    // the clicked tag was already active
    const isTagActive = activeTags.includes(tag);
    const updatedActiveTags = isTagActive
      ? removeTag(tag, activeTags)
      : addTag(tag, activeTags);

    // Update the state of the activeTags and filteredItems
    // and update the URL to contain a list of all active tags
    setActiveTags(updatedActiveTags);
    setFilteredItems(filterItemsByTags(items, updatedActiveTags));
    updateUrl(updatedActiveTags);

    function addTag(tag: string, activeTags: string[]): string[] {
      return [...activeTags, tag];
    }

    function removeTag(tag: string, activeTags: string[]): string[] {
      return activeTags.filter((activeTag) => activeTag != tag);
    }

    function updateUrl(tags: string[]): void {
      // Get the current URL and remove existing 'tags' parameters
      const currentUrl = new URL(window.location.href);
      // Replace existing 'tags' query parameters with list of new tags
      currentUrl.searchParams.delete("tags");
      tags.forEach((tag) => {
        currentUrl.searchParams.append("tags", tag);
      });
      // Replace the current URL with the updated one
      window.history.replaceState({}, "", currentUrl.toString());
    }
  };

  return (
    <>
      <div>
        {tags.map((tag) => (
          <div key={tag} style={{ display: "inline-block", margin: "4px" }}>
            <TileButton
              onClick={() => handleTagClick(tag)}
              text={tag}
              active={activeTags.includes(tag)}
            />
          </div>
        ))}
      </div>
      <div className="my-3">
        <ul role="list" className="grid md:grid-cols-2 gap-4">
          {filteredItems.map((card) => (
            <CardItem
              href={card.href}
              title={card.title}
              body={card.body}
              badges={card.badges}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
