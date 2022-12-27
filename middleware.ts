import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./hooks/useUser";
import { Fetch } from "./util/Fetch";

export async function middleware(request: NextRequest) {
  // TODO: handle trial and subscription
  // const token = request.cookies.get("token")?.value;
  // const _config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   },
  // };
  // Fetch.setAdapter("fetch");
  // const res_userDetails = await Fetch.get(`/user/me`, _config);
  // const userDetails = res_userDetails.data;
  // // check trial
  // const trial_end_at = new Date(userDetails.tenant.trial_end_at).getTime();
  // const now = new Date().getTime();
  // const is_trial_end = trial_end_at < now ? true : false;
  // console.log(is_trial_end);
  // return new NextResponse(
  //   JSON.stringify({ error: true, message: "Forbidden" }),
  //   { status: 403, headers: { "content-type": "application/json" } }
  // );
  // return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|favicon.ico).*)",
    // "/organization/:path*",
  ],
};
