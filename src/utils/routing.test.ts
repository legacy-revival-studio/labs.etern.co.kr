import { describe, it, expect } from "vitest";
import { resolveHref } from "./routing";

describe("Astro Link Component Route Resolver 테스트", () => {
  // 환경 조건 상수 정의
  const BASE_URL_PROD = "/labs/";
  const PATH_KOREAN = "/labs/contact/";
  const PATH_ENGLISH = "/labs/en/contact/";

  it("국문 페이지에서 root 링크를 클릭하면 /labs/ 하위에 정상 조립되어야 한다", () => {
    const result = resolveHref({
      href: "/",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_KOREAN,
    });
    expect(result).toBe("/labs/");
  });

  it("영문 페이지에서 국문 페이지(/)root 링크를 클릭하면 /labs/ 하위에 정상 조립되어야 한다", () => {
    const result = resolveHref({
      href: "/",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_ENGLISH,
    });
    expect(result).toBe("/labs/");
  });

  it("국문 페이지(/)에서 root 링크를 클릭하면 /labs/ 하위에 정상 조립되어야 한다", () => {
    const result = resolveHref({
      href: "/",
      baseUrl: BASE_URL_PROD,
      currentPath: "/labs/", // 현재 페이지가 root인 경우도 테스트
    });
    expect(result).toBe("/labs/");
  });

  it("영문 페이지(/)에서 국문 root 링크를 클릭하면 /labs/ 하위에 정상 조립되어야 한다", () => {
    const result = resolveHref({
      href: "/",
      baseUrl: BASE_URL_PROD,
      currentPath: "/labs/en/", // 현재 페이지가 root인 경우도 테스트
    });
    expect(result).toBe("/labs/");
  });

  it("영문 페이지(/en/)에서 국문 페이지(/)root 링크를 클릭하면 /labs/ 하위에 정상 조립되어야 한다", () => {
    const result = resolveHref({
      href: "/",
      baseUrl: BASE_URL_PROD,
      currentPath: "/labs/en/", // 현재 페이지가 root인 경우도 테스트
    });
    expect(result).toBe("/labs/");
  });

  it("영문 페이지에서 국문 페이지(/)root 링크를 클릭하면 /labs/ 하위에 정상 조립되어야 한다", () => {
    const result = resolveHref({
      href: "/",
      baseUrl: BASE_URL_PROD,
      currentPath: "/en/", // 현재 페이지가 root인 경우도 테스트
    });
    expect(result).toBe("/labs/");
  });

  it("국문 페이지에서 일반 링크를 클릭하면 /labs/ 하위에 정상 조립되어야 한다", () => {
    const result = resolveHref({
      href: "/products/",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_KOREAN,
    });
    expect(result).toBe("/labs/products/");
  });

  it("영문 페이지에서 일반 링크를 클릭하면 자동으로 중간에 /en/이 주입되어야 한다", () => {
    const result = resolveHref({
      href: "/products/",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_ENGLISH,
    });
    expect(result).toBe("/labs/en/products/");
  });

  it("질문하셨던 버그 방지: 국문 페이지에서 대놓고 영문 링크(/en/contract/)를 걸어도 중복 없이 정제되어야 한다", () => {
    const result = resolveHref({
      href: "/en/contract/",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_KOREAN,
    });
    expect(result).toBe("/labs/en/contract/");
  });

  it("질문하셨던 버그 방지: 영문 링크에 실수로 labs가 중복(/en/labs/contract/)되어 들어와도 하나만 남아야 한다", () => {
    const result = resolveHref({
      href: "/en/labs/contract/",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_KOREAN,
    });
    expect(result).toBe("/labs/en/contract/");
  });

  it("외부 링크(https://...)나 해시 링크는 주소를 건드리지 않고 그대로 반환해야 한다", () => {
    const externalResult = resolveHref({
      href: "https://github.com",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_KOREAN,
    });
    expect(externalResult).toBe("https://github.com");

    const hashResult = resolveHref({
      href: "#section-id",
      baseUrl: BASE_URL_PROD,
      currentPath: PATH_KOREAN,
    });
    expect(hashResult).toBe("#section-id");
  });
});
