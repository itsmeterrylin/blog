import { redirect } from 'next/navigation';

// About now lives on the Now page.
export default function About() {
  redirect('/now');
}
