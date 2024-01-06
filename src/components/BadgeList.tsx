import { Badge } from "./ui/badge";

export interface Props {
  badges: Array<string>;
}

export default function name({ badges }: Props) {
  return (
    // if the badges prop is passed and it's a list, render badges list
    badges &&
    Array.isArray(badges) && (
      <ul role="list" className="flex flex-wrap gap-1">
        {badges.map((badgeName) => (
          <li>
            <Badge variant={"default"} className="hover:bg-primary">
              {badgeName}
            </Badge>
          </li>
        ))}
      </ul>
    )
  );
}
