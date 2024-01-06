import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import BadgeList from "@/components/BadgeList";
import type { CardProps } from "@/types";

export default function CardItem({ href, title, body, badges }: CardProps) {
  return (
    <li>
      <a href={href}>
        <Card>
          <CardHeader className="pt-4 pb-2 tracking-normal">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-lg text-primary/70">{body}</p>
          </CardContent>
          <CardFooter>
            <BadgeList badges={badges} />
          </CardFooter>
        </Card>
      </a>
    </li>
  );
}
