import NotFoundView, { notFoundMetadata } from "@/views/NotFoundView";

export const metadata = notFoundMetadata("id");

export default function NotFound() {
  return <NotFoundView lang="id" />;
}
