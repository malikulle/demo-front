

export type NormalRouteRouteProps = {
  outlet: JSX.Element;
  layoutName: string;
};

export default function NormalRoute({
  outlet,
}: NormalRouteRouteProps) {
  return outlet;
}
