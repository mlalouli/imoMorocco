import ListingDetailsClient from "@/components/ListingDetailsClient";

export default function ListingDetails({ params }: { params: { id: string } }) {
  // server component: pass the id down to the client component
  const id = (params as any).id;
  return <ListingDetailsClient id={String(id)} />;
}