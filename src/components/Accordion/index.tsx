/** @jsxImportSource @emotion/react */
import { FC, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import Collapse from "@kunukn/react-collapse";
import cx from "clsx";

interface IAccordionHeader {
  heading: string;
  secondaryHeading?: string;
  onToggle: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  transitionDuration?: number;
}

interface IAccordion {
  children?: JSX.Element[] | JSX.Element;
  isOpen: boolean;
  heading: string;
  secondaryHeading?: string;
  onToggle: MouseEventHandler<HTMLButtonElement>;
  transitionDuration?: number;
}

const AccordionHeader: FC<IAccordionHeader> = ({
  heading,
  secondaryHeading,
  onToggle,
  isOpen,
  transitionDuration,
}) => {
  return (
    <button
      aria-expanded={isOpen}
      onClick={onToggle}
      className="btn accordion__toggle"
      css={(theme) => css`
        border: none;
        display: flex;
        align-items: center;
        font-size: 100%;
        margin: 0;
        padding: 20px;
        padding-top: ${secondaryHeading ? "9px" : "20px"};
        padding-bottom: ${secondaryHeading ? "9px" : "20px"};
        min-height: 60px;
        position: relative;
        width: 100%;
        text-align: left;
        background: ${theme.primary};
        color: ${theme.denary};
        font-family: inherit;
        outline: none;
        cursor: pointer;

        &:focus:after {
          content: "";
          display: block;
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: -2px;
          right: -2px;
          border: 3px solid #68b2e3;
          z-index: 1;
        }
        &:focus:not(.focus-visible):after {
          display: none;
        }
      `}
    >
      <div
        css={css`
          flex: 1;
        `}
      >
        <span
          css={css`
            display: block;
            line-height: 1.25;
            font-size: 16px;
            font-weight: bold;
          `}
        >
          {heading}
        </span>
        {secondaryHeading && (
          <span
            css={css`
              margin-top: 2px;
              display: block;
              line-height: 1.25;
              font-size: 16px;
            `}
          >
            {secondaryHeading}
          </span>
        )}
      </div>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
        css={(theme) => css`
          color: ${theme.denary};
          margin-left: 15px;
          width: 20px;
          height: 20px;
          transition: transform ${transitionDuration}ms cubic-bezier(0, 1, 0, 1);
          transform: rotate(${isOpen ? ".5turn" : "0"});
        `}
      >
        <path
          fill="currentColor"
          d="M29.602 8.002l-13.6 11.562-13.6-11.562-2.4 2.752 16 13.764 16-13.764z"
        />
      </svg>
      <div
        className="accordion__divider"
        css={css`
          position: absolute;
          top: 0px;
          height: 1px;
          left: 20px;
          right: 20px;
          background: #e4e5e4;
          transition: 260ms;
          opacity: ${isOpen ? 0 : 1};
          display: none;
        `}
      />
    </button>
  );
};

const Accordion: FC<IAccordion> = ({
  children,
  isOpen,
  heading,
  secondaryHeading,
  onToggle,
  transitionDuration,
}) => {
  return (
    <div
      className={cx("accordion", {
        "accordion--is-open": isOpen,
        "accordion--is-closed": !isOpen,
      })}
      css={(theme) => css`
        position: relative;
        transition: ${transitionDuration}ms;
        border-bottom: 1px solid ${theme.denary};
      `}
    >
      <AccordionHeader
        {...{
          heading,
          secondaryHeading,
          transitionDuration,
          onToggle,
          isOpen,
        }}
      />

      <Collapse
        isOpen={isOpen}
        transition={`height ${transitionDuration}ms cubic-bezier(.4, 0, .2, 1)`}
        aria-hidden={isOpen ? "false" : "true"}
      >
        <div
          css={css`
            margin-top: 10px;
            margin-bottom: 10px;
          `}
        >
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default Accordion;
