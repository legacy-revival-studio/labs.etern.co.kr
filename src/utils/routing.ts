// src/utils/routing.ts

/**
 * Astro의 Link 컴포넌트에서 href를 조립할 때 사용하는 옵션 객체입니다.
 */
interface ResolveHrefOptions {
  href: unknown;
  baseUrl: string;
  currentPath: string;
}

/**
 * Astro의 Link 컴포넌트에서 href를 조립할 때 사용하는 유틸 함수입니다.
 * Astro 프로젝트에서 Link 컴포넌트에 전달된 href를 최종적으로 조립하여 올바른 URL을 반환하는 역할을 합니다.
 * * ### 주요 기능
 * 1. 배포 경로(baseUrl)를 자동으로 앞에 붙여줍니다.
 * 2. 현재 페이지가 영문인지 감지하여, 영문 페이지에서는 자동으로 '/en/'이 중간에 들어가도록 합니다.
 * 3. 입력된 href에서 중복된 'labs'나 'en' 세그먼트를 제거하여 깔끔한 URL을 보장합니다.
 * 4. 외부 링크(https://...)나 해시 링크(#section)인 경우에는 주소를 건드리지 않고 그대로 반환합니다.
 * * @param options - URL 조립에 필요한 옵션 객체
 * - `href`: Link 컴포넌트에 전달된 href 값입니다.
 * - `baseUrl`: Astro의 배포 경로입니다. (예: '/labs/')
 * - `currentPath`: 현재 브라우저의 경로이며, 언어 감지에 활용합니다.
 * @returns 조립된 최종 URL 문자열입니다.
 * * @example
 * - 국문 페이지에서 href="/" → "/labs/"
 * - 영문 페이지에서 href="/en/" → "/labs/en/"
 * - 국문 페이지에서 href="/products/" → "/labs/products/"
 * - 영문 페이지에서 href="/products/" → "/labs/en/products/"
 * - 국문 페이지에서 href="/en/contract/" → "/labs/en/contract/"
 * - 영문 페이지에서 href="/en/labs/contract/" → "/labs/en/contract/"
 * - 외부 링크 href="[https://github.com](https://github.com)" → "[https://github.com](https://github.com)"
 * - 해시 링크 href="#section-id" → "#section-id"
 */
export function resolveHref({
  href,
  baseUrl,
  currentPath,
}: ResolveHrefOptions): string {
  if (typeof href !== "string") return String(href);
  if (!href.startsWith("/")) return href;

  // 1. 순수 배포 경로 추출 (예: 'labs' 또는 '')
  const cleanBase = baseUrl.replace(/^\/|\/$/g, "");

  // 2. 현재 브라우저의 위치 및 언어 감지
  const isCurrentEnglish = currentPath.includes("/en/");

  // 3. 입력된 주소에서 슬래시를 기준으로 쪼개어 빈 값과 중복된 'labs'를 제거
  let segments = href
    .split("/")
    .filter((seg) => seg !== "" && seg !== cleanBase);

  // 4. 영문 모드이거나 입력 주소에 이미 'en'이 포함되어 있다면 맨 앞에 'en'을 단 하나만 보장
  // 💡 수정: 현재 영문 페이지더라도, 이동할 주소(href)가 그냥 메인("/")인 경우는 en을 강제 주입하지 않음
  const isTargetRoot = href === "/";
  const hasEn = (isCurrentEnglish && !isTargetRoot) || segments[0] === "en";

  if (hasEn) {
    segments = segments.filter((seg) => seg !== "en");
    segments.unshift("en");
  }

  // 5. 최상단에 배포 경로('labs')가 있다면 끼워 넣음
  if (cleanBase) {
    segments.unshift(cleanBase);
  }

  // 6. trailingSlash: 'always' 설정에 맞춰 끝에 무조건 '/' 조립
  return "/" + segments.join("/") + "/";
}
