export const revalidate = 60;

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";
import { readFileSync } from "fs";
import { join } from "path";
import commaNumber from "comma-number";

// Note: Add your own profile image later if needed
// const profilePhoto = toArrayBuffer(
//   readFileSync(join(process.cwd(), "public/images/terry-lin.jpg"))
// );

// Fonts
const fontsDir = join(process.cwd(), "fonts");

const inter300 = readFileSync(
  join(fontsDir, "inter-latin-300-normal.woff")
);

const inter500 = readFileSync(
  join(fontsDir, "inter-latin-500-normal.woff")
);

const robotoMono400 = readFileSync(
  join(fontsDir, "roboto-mono-latin-400-normal.woff")
);

export async function GET() {
  const posts = await getPosts();
  const viewsSum = posts.reduce((sum, post) => sum + post.views, 0);

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Inter 300")}
      >
        <main tw="flex grow pt-4 w-full justify-center items-center">
          <div tw="flex flex-col items-center justify-center">
            <div tw="text-[64px] mb-7" style={font("Inter 500")}>
              Terry Lin
            </div>
            <div tw="flex mb-5 text-[32px]" style={font("Roboto Mono 400")}>
              <span tw="text-gray-400 mr-3">&mdash;</span> Software Engineer & Technology Enthusiast
            </div>
            <div tw="flex text-[28px]" style={font("Roboto Mono 400")}>
              <span tw="text-gray-400 mr-3">&mdash;</span> terrylin.net
            </div>
          </div>
        </main>

        <footer
          tw="flex w-full justify-center text-2xl text-gray-500"
          style={font("Roboto Mono 400")}
        >
          {posts.length} posts / {commaNumber(viewsSum)} views
        </footer>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter 300",
          data: inter300,
        },
        {
          name: "Inter 500",
          data: inter500,
        },
        {
          name: "Roboto Mono 400",
          data: robotoMono400,
        },
      ],
    }
  );
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}

// Helper function for converting buffer to array buffer (if needed later)
// function toArrayBuffer(buffer) {
//   return buffer.buffer.slice(
//     buffer.byteOffset,
//     buffer.byteOffset + buffer.byteLength
//   );
// }
