import React from 'react';
import clsx from "clsx";

interface UserInfoItemProps {
  label: string,
  value?: string,
  as?: "div" | "article"
  children?: React.ReactNode;
  className?: string,
  labelClassName?: string,
}

/**
 * 사용자 정보 항목을 표시하는 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.label - 항목의 제목
 * @param {string} [props.value] - 항목의 값 (선택 사항)
 * @param {ElementType} [props.as="div"] - 렌더링할 HTML 요소 (기본값: div)
 * @param {React.ReactNode} [props.children] - 추가적인 내용
 * @param {string} [props.className] - 추가할 CSS 클래스
 * @param {string} [props.labelClassName] - 제목(`label`)에 적용할 CSS 클래스
 *
 * @example
 * // 기본 사용법
 * <UserInfoItem label="닉네임" value="홍길동" />
 *
 * @example
 * // article 태그로 변경
 * <UserInfoItem label="소개" as="article">
 *   안녕하세요, 저는 개발자입니다.
 * </UserInfoItem>
 */
const UserInfoItem = ({
  label,
  value,
  as = "div",
  children,
  className,
  labelClassName,
}: UserInfoItemProps) => {
  const Component = as;
  return (
      <Component className={clsx(className)}>
        <h3 className={clsx(`text-lg font-semibold ${labelClassName}`)}>
          {label}
        </h3>
        {value && <p>{value}</p>}
        <p>{children}</p>
      </Component>
  );
};

export default UserInfoItem;