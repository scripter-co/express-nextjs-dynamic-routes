import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/item/[number]" as="/item/1">
          a
        </Link>
      </li>
      <li>
        <Link href="/item/[number]" as="/item/2">
          b
        </Link>
      </li>
    </ul>
  );
}
