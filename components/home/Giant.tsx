import { ScrollGiant } from "@/components/motion/Agx";

/** The template's huge faded phrase, growing in with the scroll: decoration only. */
export default function Giant({ text }: { text: string }) {
  return <ScrollGiant text={text} />;
}
