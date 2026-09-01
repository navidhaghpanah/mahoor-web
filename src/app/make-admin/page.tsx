import { notFound } from "next/navigation";

// Administrative role changes must be performed directly in the database by an
// operator. A public route must never be able to elevate accounts.
export default function MakeAdminPage() {
  notFound();
}
