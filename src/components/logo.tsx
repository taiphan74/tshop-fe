import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex justify-center m-0 p-0">
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
    </Link>
  );
}