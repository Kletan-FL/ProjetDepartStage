import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Hello World :D</p>
      <ul>
        <li>
          <Link href="/clients">Liste clients</Link>
        </li>
        <li>
          <Link href="/independants">Liste indépendants</Link>
        </li>
      </ul>
    </div>
  );
}
