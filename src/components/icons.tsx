import * as React from "react";

import { IconSvgProps } from "@/utils/types";

export const MuserpolLogo = () => (
  <svg className="flex flex-row w-full h-20 m-2" viewBox="0 0 200 60">
    <image height="80" href="muserpol-logo.png" width="180" x="10" y="-8" />
  </svg>
);
export const Logo: React.FC<IconSvgProps> = ({
  size,
  width,
  height,
  ...props
}) => {
  const finalSize = size ?? width ?? height;
  const finalWidth = width ?? finalSize;
  const finalHeight = height ?? finalSize;

  return (
    <svg
      fill="none"
      height={finalHeight}
      viewBox={`0 0 ${finalWidth} ${finalHeight}`}
      width={finalWidth}
      {...props}
    >
      <image
        height={finalHeight}
        href="/muserpol-logo.png"
        width={finalWidth}
        x="0"
        y="0"
      />
    </svg>
  );
};

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="black"
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const PersonInfoIcon = (props: IconSvgProps) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="9" cy="9" r="2" stroke="green" strokeWidth="1.5" />
    <path
      d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z"
      stroke="green"
      strokeWidth="1.5"
    />
    <path
      d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.298 5.64118 21.5794 6.2255 21.748 7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
    <path
      d="M19 12H15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
    <path
      d="M19 9H14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
    <path
      d="M19 15H16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const TouchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 192 192"
    width="24"
    {...props}
  >
    <path
      d="M140.424 38.019a3.6 3.6 0 0 1-1.777-.462C123.81 29.934 110.98326.7 95.528 26.7c-15.223 0-29.75 3.619-42.964 10.857-1.854 1.001-4.172.308-5.254-1.54-1.005-1.848-.31-4.235 1.545-5.236C63.228
  22.85 78.992 19 95.528 19c16.537 0 30.91 3.619 46.673 11.55 1.932 1.155 2.628 3.465 1.623 5.313-.695 1.386-1.932 2.156-3.4 2.156ZM29.846 
  78.444a4.036 4.036 0 0 1-2.24-.693c-1.624-1.232-2.165-3.619-.928-5.39 7.65-10.78 17.386-19.25 28.977-25.179 24.419-12.474 55.328-12.551 79.669-.077 
  11.591 5.929 21.327 14.245 28.977 25.025 1.237 1.694.773 4.158-.927 5.39-1.777 1.232-4.173.847-5.409-.77-6.955-9.856-15.764-17.479-26.196-22.792-22.177-11.319-50.536-11.319-72.636.077-10.51 
  5.39-19.319 13.09-26.273 22.715-.618 1.155-1.778 1.694-3.014 1.694Zm48.296 92.939c-1.005 0-1.932-.385-2.705-1.155-6.722-6.699-10.354-11.011-15.532-20.328-5.332-9.471-8.113-21.021-8.113-33.418 
  0-22.869 19.627-41.503 43.736-41.503 24.11 0 43.737 18.634 43.737 41.503 0 1.021-.407 2-1.132 2.722a3.87 3.87 0 0 1-5.464 0 3.844 3.844 0 0 1-1.131-2.722c0-18.634-16.15-33.803-36.01-33.803-19.859 
  0-36.01 15.169-36.01 33.803 0 11.088 2.474 21.329 7.187 29.568 4.946 8.932 8.346 12.705 14.296 18.711a3.943 3.943 0 0 1 0 5.467c-.927.77-1.855 1.155-2.86 1.155Zm55.405-14.245c-9.196 
  0-17.309-2.31-23.955-6.853-11.514-7.777-18.391-20.405-18.391-33.803 0-1.021.407-2 1.132-2.722a3.871 3.871 0 0 1 5.464 0 3.843 3.843 0 0 1 
  1.131 2.722c0 10.857 5.564 21.098 14.991 27.412 5.487 3.696 11.9 5.467 19.628 5.467 1.854 0 4.945-.231 8.036-.77 2.087-.385 4.173 1.001 
  4.482 3.157.386 2.002-1.005 4.081-3.168 4.466-4.405.847-8.268.924-9.35.924ZM118.015 173h-1.005c-12.286-3.542-20.323-8.085-28.745-16.324-10.819-10.626-16.769-24.948-16.769-40.194 0-12.474 
  10.664-22.638 23.8-22.638 13.137 0 23.801 10.164 23.801 22.638 0 8.239 7.341 14.938 16.072 14.938 8.887 0 16.073-6.699 16.073-14.938 0-29.029-25.114-52.591-56.023-52.591-21.945 0-42.191 
  12.166-51.077 31.031-3.014 6.237-4.56 13.552-4.56 21.56 0 6.006.541 15.477 5.178 27.797.773 2.002-.232 4.235-2.241 4.928-2.01.693-4.25-.308-4.946-2.233-3.863-10.087-5.64-20.174-5.64-30.492 0-9.24 1.777-17.633 5.254-24.948 10.277-21.483 33.073-35.42 58.032-35.42 35.082 0 63.751 27.027 63.751 60.291 0 12.474-10.664 22.638-23.801 22.638-13.136 0-23.8-10.164-23.8-22.638 0-8.239-7.186-14.938-16.073-14.938-8.886 0-16.072 6.699-16.072 14.938 0 13.167 5.1 25.487 14.45 34.727 7.341 7.238 14.373 11.242 25.268 14.168 2.086.616 3.246 2.772 2.705 4.774-.387 1.771-2.009 2.926-3.632 2.926Z"
      fill="#000000"
      stroke="currentColor"
      strokeWidth="4"
    />
  </svg>
);

export const TouchIndiceIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 48 48"
    width="24"
    {...props}
  >
    <path
      d="M18 43V22C18 18.6863 20.6863 16 24 16C27.3137 16 30 18.6863 30 22V43"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
    <path
      d="M12 40V22C12 15.3726 17.3726 10 24 10C30.6274 10 36 15.3726 36 22V40"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
    <path
      d="M6 35V22C6 12.0589 14.0589 4 24 4C33.9411 4 42 12.0589 42 22V35"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
    <path
      d="M24 44V31"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
    <path
      d="M24 24.625V21.875"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
  </svg>
);

export const TouchPulgarIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M13.1427 20.9999C10.8077 19.5438 9.25254 16.9522 9.25254 13.9968C9.25254 12.4783 10.4833 11.2476 12.0008 11.2476C13.5184 11.2476 14.7491 12.4783 14.7491 13.9968C14.7491 15.5153 15.9798 16.746 17.4974 16.746C19.0149 16.746 20.2457 15.5153 20.2457 13.9968C20.2457 9.44139 16.5544 5.74922 12.0017 5.74922C7.44907 5.74922 3.75781 9.44139 3.75781 13.9968C3.75781 15.0122 3.87145 16.001 4.08038 16.954M8.49027 20.2989C7.23938 18.5138 6.50351 16.3419 6.50351 13.9968C6.50351 10.9599 8.96405 8.49844 11.9992 8.49844C15.0343 8.49844 17.4948 10.9599 17.4948 13.9968M17.7927 19.4806C17.6937 19.4861 17.5966 19.4953 17.4967 19.4953C14.4616 19.4953 12.0011 17.0338 12.0011 13.9969M19.6734 6.47682C17.7993 4.34802 15.0593 3 12.0004 3C8.94141 3 6.20138 4.34802 4.32734 6.47682"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export const ChevronRightIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};

export const PersonalDataIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 32 32"
      width="24"
      {...props}
    >
      <path d="M28,6V26H4V6H28m0-2H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z" />
      <rect height="2" width="7" x="6" y="10" />
      <rect height="2" width="4" x="6" y="14" />
      <path d="M23,18H17a3,3,0,0,0-3,3v2h2V21a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v2h2V21A3,3,0,0,0,23,18Z" />
      <path d="M20,17a4,4,0,1,0-4-4A4,4,0,0,0,20,17Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,20,11Z" />
    </svg>
  );
};

export const PoliceDataIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 512 512"
      width="24"
      {...props}
    >
      <g>
        <g>
          <path
            d="M217.205,334.821c-5.242-0.107-9.546,4.032-9.659,9.253c-0.44,20.496-14.475,38.628-34.165,44.104
            c-0.18,0.05-0.726,0.193-1.935,0.426c-13.369,2.609-25.747,8.865-35.73,17.933c-9.984-9.066-22.368-15.323-35.764-17.94
            c-1.178-0.226-1.728-0.368-1.942-0.429c-13.077-3.637-23.925-12.917-29.761-25.46c-5.831-12.531-5.858-26.407-0.073-39.071
            l6.453-14.13c3.537-7.743,5.331-15.979,5.331-24.481c0-12.309-3.766-24.082-10.743-33.955l16.97-17.136
            c7.453,4.361,15.984,6.7,24.732,6.7c8.73,0,17.318-2.365,24.798-6.752c7.479,4.387,16.067,6.752,24.798,6.752
            c8.747,0,17.279-2.341,24.731-6.7l16.97,17.137c-6.978,9.875-10.743,21.649-10.743,33.958c0,8.506,1.792,16.74,5.327,24.479
            l6.459,14.13c2.172,4.752,7.785,6.841,12.534,4.671c4.752-2.172,6.841-7.783,4.671-12.534l-6.458-14.129
            c-2.399-5.252-3.616-10.843-3.616-16.617c0-10.497,4.029-20.418,11.347-27.935c3.597-3.695,3.571-9.589-0.057-13.251
            l-28.634-28.914c-3.501-3.535-9.139-3.754-12.903-0.502c-5.444,4.703-12.415,7.293-19.627,7.293c-6.94,0-13.459-2.303-18.857-6.66
            c-3.467-2.8-8.416-2.8-11.882,0c-5.397,4.357-11.918,6.66-18.857,6.66c-7.213,0-14.183-2.59-19.627-7.293
            c-3.764-3.252-9.404-3.032-12.903,0.502l-28.634,28.914c-3.628,3.663-3.653,9.559-0.055,13.254
            c7.317,7.513,11.346,17.432,11.346,27.929c0,5.772-1.218,11.364-3.621,16.622l-6.458,14.13c-8.003,17.521-7.956,37.536,0.13,54.91
            c8.176,17.568,23.427,30.581,41.81,35.693c0.931,0.262,2.072,0.522,3.453,0.787c12.564,2.454,23.949,9.221,32.058,19.055
            c1.797,2.179,4.473,3.441,7.298,3.441c2.825,0,5.501-1.262,7.298-3.441c8.11-9.835,19.494-16.602,32.031-19.049
            c1.415-0.272,2.551-0.531,3.44-0.782c27.629-7.682,47.356-33.142,47.973-61.914C226.57,339.258,222.428,334.933,217.205,334.821z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M163.043,283.073h-54.659c-5.223,0-9.458,4.235-9.458,9.458s4.235,9.458,9.458,9.458h54.659
            c5.223,0,9.458-4.235,9.458-9.458S168.267,283.073,163.043,283.073z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M163.043,312.225h-54.659c-5.223,0-9.458,4.235-9.458,9.458s4.235,9.458,9.458,9.458h54.659
            c5.223,0,9.458-4.235,9.458-9.458S168.267,312.225,163.043,312.225z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M346.753,88.728h-29.188c-4.569-29.875-30.44-52.832-61.572-52.832c-31.132,0-57.003,22.955-61.572,52.832h-29.189
            c-5.223,0-9.458,4.235-9.458,9.458v39.308H9.458c-5.223,0-9.458,4.235-9.458,9.458v246.423c0,5.225,4.235,9.459,9.458,9.459
            s9.458-4.235,9.458-9.458V156.411h136.86v23.052c0,5.223,4.235,9.458,9.458,9.458h181.519c5.225,0,9.458-4.235,9.458-9.458V98.186
            C356.212,92.963,351.978,88.728,346.753,88.728z M337.297,170.006H174.693v-62.362h28.471c5.223,0,9.458-4.235,9.458-9.458
            c0-23.916,19.457-43.373,43.372-43.373c23.916,0,43.373,19.457,43.373,43.373c0,5.223,4.233,9.458,9.458,9.458h28.47V170.006z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M502.542,137.495H373.284c-5.225,0-9.458,4.235-9.458,9.458s4.233,9.458,9.458,9.458h119.8v300.776H18.916v-34.385
            c0-5.223-4.235-9.458-9.458-9.458S0,417.579,0,422.803v43.843c0,5.223,4.235,9.458,9.458,9.458h493.084
            c5.225,0,9.458-4.235,9.458-9.458V146.953C512,141.729,507.767,137.495,502.542,137.495z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M455.577,235.028H306.568c-5.225,0-9.458,4.235-9.458,9.458c0,5.223,4.233,9.458,9.458,9.458h149.009
            c5.225,0,9.458-4.235,9.458-9.458C465.035,239.263,460.802,235.028,455.577,235.028z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M455.577,378.618H306.568c-5.225,0-9.458,4.235-9.458,9.458c0,5.223,4.233,9.458,9.458,9.458h149.009
            c5.225,0,9.458-4.235,9.458-9.458C465.035,382.853,460.802,378.618,455.577,378.618z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M455.577,282.891H306.568c-5.225,0-9.458,4.235-9.458,9.458s4.233,9.458,9.458,9.458h149.009
            c5.225,0,9.458-4.235,9.458-9.458S460.802,282.891,455.577,282.891z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M455.577,330.755H306.568c-5.225,0-9.458,4.235-9.458,9.458s4.233,9.458,9.458,9.458h149.009
            c5.225,0,9.458-4.235,9.458-9.458S460.802,330.755,455.577,330.755z"
          />
        </g>
      </g>
      <g>
        <g>
          <circle cx="255.986" cy="98.188" r="9.458" />
        </g>
      </g>
    </svg>
  );
};

export const DocumentsDataIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 32 32"
      width="24"
      {...props}
    >
      <path
        d="M12 13H15M12 16H20M12 20H20M12 24H20M21 7V2C21 1.447 20.553 1 20 1H2C1.447 1 1 1.447 1 2V24C1 24 
      1 25 2 25H3M26 27H30C30.553 27 31 26.553 31 26V4C31 3.447 30.553 3 30 3H24M26 30C26 30.553 25.553 31 25 
      31H7C6.447 31 6 30.553 6 30V8C6 7.447 6.447 7 7 7H25C25.553 7 26 7.447 26 8V30Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const AffiliateDataIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 32 32"
      width="24"
      {...props}
    >
      <path
        d="M29.36,31h-0.72c0-5.551-4.122-10.56-9.803-11.909c-0.15-0.036-0.261-0.163-0.275-0.317
        c-0.015-0.153,0.07-0.299,0.212-0.362c2.458-1.097,4.046-3.542,4.046-6.231c0-0.151-0.005-0.301-0.014-0.449
        c-1.63,0.907-3.658,2.029-6.833,2.029c-3.152,0-5.144-1.114-6.744-2.01l-0.034-0.019C9.185,11.88,9.18,12.03,9.18,12.18
        c0,2.69,1.592,5.136,4.056,6.231c0.141,0.062,0.227,0.209,0.212,0.362c-0.014,0.154-0.125,0.281-0.275,0.317
        C7.487,20.439,3.36,25.448,3.36,31H2.64c0-5.585,3.931-10.647,9.47-12.365c-2.244-1.353-3.65-3.796-3.65-6.455
        c0-1.083,0.224-2.123,0.667-3.096l-0.07-0.087L6.694,5.189c-0.061-0.098-0.07-0.218-0.027-0.325C6.71,4.758,6.802,4.678,6.914,4.65
        c0.023-0.006,2.373-0.607,3.317-2.324c0.063-0.115,0.184-0.187,0.315-0.187c2.649,0,3.823-0.319,5.231-1.423
        c0.131-0.103,0.313-0.103,0.444,0c1.339,1.05,2.312,1.423,5.101,1.423c0.131,0,0.252,0.071,0.315,0.187
        c0.947,1.72,3.42,2.317,3.444,2.323c0.112,0.026,0.206,0.105,0.25,0.212c0.045,0.107,0.035,0.229-0.025,0.327l-2.424,3.916
        c0.436,0.967,0.657,2,0.657,3.076c0,2.657-1.403,5.1-3.643,6.455C25.433,20.353,29.36,25.416,29.36,31z M9.833,11.263
        c1.485,0.826,3.337,1.777,6.14,1.777c2.795,0,4.671-0.938,6.175-1.769c-1.567-0.694-3.298-1.277-6.143-1.277
        C12.946,9.995,11.048,10.667,9.833,11.263z M16.005,9.275c3.119,0,4.956,0.667,6.657,1.438c-0.113-0.516-0.288-1.017-0.522-1.499
        c-1.565-0.708-3.255-1.322-6.122-1.322c-3.139,0-5.007,0.735-6.163,1.333c-0.231,0.476-0.403,0.971-0.516,1.48
        C11.262,9.731,13.389,9.275,16.005,9.275z M16.018,7.173c2.989,0,4.754,0.634,6.384,1.37l2.044-3.331
        c-0.811-0.268-2.459-0.96-3.33-2.354c-2.501-0.016-3.683-0.336-5.117-1.406c-1.413,1.045-2.711,1.389-5.246,1.406
        C9.895,4.242,8.332,4.934,7.551,5.207L9.617,8.54C11.464,7.608,13.508,7.173,16.018,7.173z M21.5,30.36
        c-0.033,0-0.066-0.005-0.1-0.015c-1.548-0.443-2.761-2.039-2.761-3.632v-1.962c0-0.199,0.161-0.36,0.36-0.36
        c1.257,0,1.699-0.197,2.271-0.669c0.133-0.111,0.326-0.111,0.459,0c0.571,0.472,1.014,0.669,2.271,0.669
        c0.199,0,0.36,0.161,0.36,0.36v1.962c0,1.593-1.213,3.188-2.761,3.632C21.566,30.355,21.533,30.36,21.5,30.36z M19.36,25.106v1.607
        c0,1.103,0.798,2.472,2.14,2.909c1.342-0.438,2.14-1.807,2.14-2.909v-1.607c-0.961-0.032-1.532-0.205-2.14-0.65
        C20.893,24.901,20.321,25.074,19.36,25.106z M13,27.36H8v-0.72h5V27.36z M16,6.66c-0.033,0-0.067-0.004-0.099-0.014
        C15.04,6.399,14.39,5.544,14.39,4.657V3.676c0-0.199,0.161-0.36,0.36-0.36c0.6,0,0.779-0.094,1.021-0.293
        c0.133-0.11,0.325-0.11,0.458,0c0.242,0.199,0.421,0.293,1.021,0.293c0.199,0,0.36,0.161,0.36,0.36v0.981
        c0,0.887-0.649,1.742-1.511,1.989C16.067,6.655,16.034,6.66,16,6.66z M15.11,4.023v0.634c0,0.46,0.337,1.052,0.89,1.263
        c0.552-0.211,0.89-0.803,0.89-1.263V4.023C16.522,3.994,16.259,3.912,16,3.747C15.742,3.912,15.479,3.994,15.11,4.023z"
        stroke="currentColor"
      />
    </svg>
  );
};

export const BeneficiariesDataIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 256 256"
      width="24"
      {...props}
    >
      <path
        d="M223.9,123.1c6.4,0,11.5-5.2,11.5-11.6c0-6.4-5.2-11.6-11.5-11.6c-6.4,0-11.6,5.2-11.6,11.6
	C212.3,117.9,217.5,123.1,223.9,123.1"
      />
      <path
        d="M144.5,59.4c9.1,0,16.5-7.4,16.5-16.5c0-9.1-7.4-16.5-16.5-16.5c-9.1,0-16.5,7.4-16.5,16.5
	C128,52,135.4,59.4,144.5,59.4"
      />
      <path
        d="M51.9,59.5c9.2,0,16.7-7.4,16.7-16.6c0-9.2-7.5-16.6-16.7-16.6c-9.2,0-16.7,7.4-16.7,16.6
	C35.1,52.1,42.6,59.5,51.9,59.5"
      />
      <path
        d="M208.2,222.9c0,3.7,3.1,6.8,6.8,6.8c3.7,0,6.8-3,6.8-6.8v-40.5h5.3v40.5c0,3.7,3,6.8,6.8,6.8
	c3.7,0,6.8-3,6.8-6.8v-75.8h5.2v25.7c0,2.8,2.3,5.1,5,5.1c2.8,0,5-2.3,5-5.1v-29.2c0-8.2-7.2-14.8-15.4-14.8c0,0-31.4,0-31.5,0
	l-10.1-1l-13-45.5c-5.3-18.3-20.6-17.8-20.6-17.8h-42.3c0,0-15.3-0.6-20.6,17.8l-6.8,23.8l-6.8-23.8C83.5,64,68.2,64.6,68.2,64.6
	H35.5c0,0-15.4-0.6-20.6,17.8L1.7,128.2c-1.3,4.3,0.8,8.3,4.6,9.4c3.7,1.1,7.8-1.5,8.8-5l12.8-44.7h6.3l-18.7,77.4H32v55
	c0,4.5,3.6,8.2,8.2,8.2c4.5,0,8.2-3.7,8.2-8.2v-55h6.9v55c0,4.5,3.7,8.2,8.2,8.2c4.5,0,8.2-3.7,8.2-8.2v-55H88L69.5,87.9h6.2
	l12.8,44.7c0.9,3,3.6,5.4,6.8,5.1c3.2,0.3,6.5-2.1,7.3-5.1l12.8-44.7h5.8v130.8c0,5.3,4.4,9.6,9.7,9.6c5.3,0,9.7-4.3,9.7-9.6v-74.4
	h7.1v74.4c0,5.3,4.3,9.6,9.7,9.6c5.3,0,9.7-4.3,9.7-9.6V87.9h6.3l11.9,43.2c0.7,2.6,3.4,5.1,6.3,6l16.6,4.6V222.9z"
      />
    </svg>
  );
};

export const CircleIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="8"
      role="presentation"
      viewBox="0 0 16 16"
      width="8"
      {...props}
    >
      <circle cx="8" cy="8" r="8" stroke="currentColor" />
    </svg>
  );
};

export const TouchRegisterIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M7 16V11.3615C7 10.8518 7.10026 10.3624 7.28451 9.90769M17 16V12.8154M9.22222 7.73446C10.0167 7.27055 10.9721 7 12 7C14.2795 7 16.2027 8.33062 16.8046 10.15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 17V14.8235M14 17V11.8529C14 10.8296 13.1046 10 12 10C10.8954 10 10 10.8296 10 11.8529V12.6471"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const DocumentRegisterIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
        <path d="M14.5 15.5h-5" strokeLinecap="round" />
        <path d="M12 18v-5" strokeLinecap="round" />
        <path d="M5 20V4a1 1 0 011-1h6.172a2 2 0 011.414.586l4.828 4.828A2 2 0 0119 9.828V20a1 1 0 01-1 1H6a1 1 0 01-1-1z" />
        <path d="M12 3v6a1 1 0 001 1h6" />
      </g>
    </svg>
  );
};

export const DocumentEditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <path
        d="M13 3H7C5.89543 3 5 3.89543 5 5V10M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M19 9V19C19 20.1046 18.1046 21 17 21H10C7.79086 21 6 19.2091 6 17V17C6 14.7909 7.79086 13 10 13H13M13 13L10 10M13 13L10 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const DocumentViewIcon = (props: IconSvgProps) => {
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeMiterlimit: 10,
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 32 32"
      width="24px"
      {...props}
    >
      <polyline
        points="19,3 19,9 25,9 19,3 7,3 7,29 25,29 25,22.7"
        {...strokeProps}
      />
      <circle cx="21" cy="19" r="2" {...strokeProps} />
      <line x1="25" x2="25" y1="9" y2="15" {...strokeProps} />
      <path
        d="M29,19c0,0-3.6,5-8,5s-8-5-8-5s3.6-5,8-5S29,19,29,19z"
        {...strokeProps}
      />
    </svg>
  );
};

export const CopyIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="18"
      {...props}
    >
      <path
        d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
};
export const ContactsPhoneIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      className="text-black dark:text-white"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <rect
        fill="none"
        height="20"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
        width="15"
        x="5.5"
        y="2"
      />
      <circle cx="4" cy="5" fill="currentColor" r="0.8" />
      <circle cx="4" cy="10" fill="currentColor" r="0.8" />
      <circle cx="4" cy="15" fill="currentColor" r="0.8" />
      <path
        d="M15.1 14.5c-.8-.3-1.6-.7-2.2-1.3-.6-.6-1-1.4-1.3-2.2-.1-.4 0-.9.3-1.2l.8-.8c.2-.2.2-.5 0-.7l-2-2c-.2-.2-.5-.2-.7 0l-.9.9c-.5.5-.6 1.3-.5 2 .3 1.3 1 2.6 2.1 3.7 1.1 1.1 2.4 1.8 3.7 2.1.7.2 1.5 0 2-.5l.9-.9c.2-.2.2-.5 0-.7l-2-2c-.2-.2-.5-.2-.7 0l-.8.8c-.3.3-.7.4-1.1.3z"
        fill="currentColor"
        transform="translate(-1,0) scale(1.1)"
      />
    </svg>
  );
};
export const ContactsCellPhoneIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      className="text-black dark:text-white"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <rect
        fill="none"
        height="20"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
        width="15"
        x="5.5"
        y="2"
      />
      <circle cx="4" cy="5" fill="currentColor" r="0.8" />
      <circle cx="4" cy="10" fill="currentColor" r="0.8" />
      <circle cx="4" cy="15" fill="currentColor" r="0.8" />
      <path
        clipRule="evenodd"
        d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
        fillRule="evenodd"
        transform="translate(6,4.5) scale(0.6)"
      />
    </svg>
  );
};

export const CollapseTrueIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <g>
        <path d="M0 0H24V24H0z" fill="none" />
        <path
          d="M21 18v2H3v-2h18zM6.596 3.904L8.01 5.318 4.828 8.5l3.182 3.182-1.414 1.414L2 8.5l4.596-4.596zM21 11v2h-9v-2h9zm0-7v2h-9V4h9z"
          fill="green"
        />
      </g>
    </svg>
  );
};

export const CollapseFalseIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <g>
        <path d="M0 0H24V24H0z" fill="none" />
        <path
          d="M21 18v2H3v-2h18zM17.404 3.904L22 8.5l-4.596 4.596-1.414-1.414L19.172 8.5 15.99 5.318l1.414-1.414zM12 11v2H3v-2h9zm0-7v2H3V4h9z"
          fill="green"
        />
      </g>
    </svg>
  );
};

export const PersonsIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="#006400"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 98.666 98.666"
      width="24px"
      {...props}
    >
      <g>
        <g>
          <circle cx="49.332" cy="53.557" r="10.297" />
          <path
            d="M53.7,64.556h-8.737c-7.269,0-13.183,5.916-13.183,13.184v10.688l0.027,0.166l0.735,0.229
            c6.937,2.168,12.965,2.892,17.927,2.892c9.688,0,15.303-2.764,15.65-2.938l0.688-0.351l0.071,0.002V77.739
            C66.883,70.472,60.971,64.556,53.7,64.556z"
          />
          <circle cx="28.312" cy="23.563" r="16.611" />
          <path
            d="M70.35,40.174c9.174,0,16.609-7.44,16.609-16.613c0-9.17-7.438-16.609-16.609-16.609c-9.176,0-16.61,7.437-16.61,16.609
            S61.174,40.174,70.35,40.174z"
          />
          <path
            d="M41.258,62.936c-2.637-2.274-4.314-5.632-4.314-9.378c0-4.594,2.519-8.604,6.243-10.743
            c-2.425-0.965-5.061-1.511-7.826-1.511H21.266C9.54,41.303,0,50.847,0,62.571v17.241l0.043,0.269L1.23,80.45
            c10.982,3.432,20.542,4.613,28.458,4.656v-7.367C29.688,70.595,34.623,64.599,41.258,62.936z"
          />
          <path
            d="M77.398,41.303H63.305c-2.765,0-5.398,0.546-7.824,1.511c3.727,2.139,6.246,6.147,6.246,10.743
            c0,3.744-1.678,7.102-4.313,9.376c2.656,0.661,5.101,2.02,7.088,4.008c2.888,2.89,4.479,6.726,4.478,10.8v7.365
            c7.916-0.043,17.477-1.225,28.457-4.656l1.187-0.369l0.044-0.269V62.571C98.664,50.847,89.124,41.303,77.398,41.303z"
          />
        </g>
      </g>
    </svg>
  );
};

export const FileDossiersIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <path d="M2.8 5H1v16h11v-1H2V9h20v4h1V5H12.2L11 3H4zm7.634-1l1.2 2H22v2H2V6h1.366l1.2-2zM12 17h1v6h10v-6h1v-3H12zm10 3v2h-8v-5h8zm-9-5h10v1H13zm7 4h-4v-1h4z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

export const GarbageIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="rgb(255, 50, 50)"
      focusable="false"
      height="20px"
      role="presentation"
      viewBox="0 0 24 24"
      width="20px"
      {...props}
    >
      <path
        d="M12,13.5857864 L14.2928932,11.2928932 L15.7071068,12.7071068 L13.4142136,15 L15.7071068,17.2928932 L14.2928932,18.7071068 L12,16.4142136 L9.70710678,18.7071068 L8.29289322,17.2928932 L10.5857864,15 L8.29289322,12.7071068 L9.70710678,11.2928932 L12,13.5857864 Z M7,4 L7,3 C7,1.8954305 7.8954305,1 9,1 L15,1 C16.1045695,1 17,1.8954305 17,3 L17,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,8 C22,9.1045695 21.1045695,10 20,10 L19.9198662,10 L19,21 C19,22.1045695 18.1045695,23 17,23 L7,23 C5.8954305,23 5,22.1045695 5.00345424,21.0830455 L4.07986712,10 L4,10 C2.8954305,10 2,9.1045695 2,8 L2,6 C2,4.8954305 2.8954305,4 4,4 L7,4 Z M7,6 L4,6 L4,8 L20,8 L20,6 L17,6 L7,6 Z M6.08648886,10 L7,21 L17,21 L17.0034542,20.9169545 L17.9132005,10 L6.08648886,10 Z M15,4 L15,3 L9,3 L9,4 L15,4 Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const CancelIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="16px"
      role="presentation"
      viewBox="0 0 512 512"
      width="16px"
      {...props}
    >
      <path d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm-80.625 60c-.97-.005-2.006.112-3.063.313v-.032c-18.297 3.436-45.264 34.743-33.375 46.626l73.157 73.125-73.156 73.126c-14.63 14.625 29.275 58.534 43.906 43.906L256 299.906l73.156 73.156c14.63 14.628 58.537-29.28 43.906-43.906l-73.156-73.125 73.156-73.124c14.63-14.625-29.275-58.5-43.906-43.875L256 212.157l-73.156-73.125c-2.06-2.046-4.56-3.015-7.47-3.03z" />
    </svg>
  );
};

export const RegisterIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="18px"
      role="presentation"
      viewBox="0 0 96 96"
      width="18px"
      {...props}
    >
      <g>
        <path d="M66,42H54V30a6,6,0,0,0-12,0V42H30a6,6,0,0,0,0,12H42V66a6,6,0,0,0,12,0V54H66a6,6,0,0,0,0-12Z" />
        <path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z" />
      </g>
    </svg>
  );
};

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="18px"
      role="presentation"
      viewBox="0 0 24 24"
      width="18px"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 
        0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 
        1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 
        1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const PlusIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const DefaultIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 1920 1920"
      width="24px"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M0 426.667C0 191.025 191.025 0 426.667 0c235.641 0 426.666 191.025 426.666
      426.667 0 235.641-191.025 426.666-426.666 426.666C191.025 853.333 0 662.308 0 426.667zm426.667
      320c-176.731 0-320-143.269-320-320s143.269-320 320-320 320 143.269 320 320-143.269 320-320 320zM0
      1920v-853.33h853.333V1920H0zm106.667-106.67v-640h640v640h-640zM1920 853.333 1440 0 960 853.333h960zm-182.38-106.666L1440
      217.571l-297.62 529.096h595.24zM1386.67 1920v-373.33h-373.34V1440h373.34v-373.33h106.66V1440h373.34v106.67h-373.34V1920h-106.66Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const EyeViewIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="20px"
      role="presentation"
      viewBox="0 0 24 24"
      width="20px"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 
      15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 
      13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 
      5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 
      19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 
      17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 
      19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const TimeIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="16px"
      role="presentation"
      viewBox="0 0 24 24"
      width="16px"
      {...props}
    >
      <path
        d="M5.28249 5.28248C3.72835 6.83662 2.76118 8.88154 2.54575 11.0688C2.33032 13.2561 2.87996 15.4504 4.10104 17.2779C5.32211 19.1054 7.13906 20.4529 9.24229 21.0909C11.3455 21.7289 13.6049 21.6179 15.6355 20.7769C17.6661 19.9358 19.3422 18.4166 20.3783 16.4783C21.4143 14.5399 21.7462 12.3023 21.3175 10.1466C20.8887 7.991 19.7257 6.05072 18.0267 4.6564C16.3278 3.26208 14.1979 2.5 12 2.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M12 12L7 7" stroke="currentColor" strokeLinecap="round" />
      <path d="M12 2.5V5" stroke="currentColor" strokeLinecap="round" />
      <path d="M21 12L19 12" stroke="currentColor" strokeLinecap="round" />
      <path d="M12 19V21" stroke="currentColor" strokeLinecap="round" />
      <path d="M5 12L3 12" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
};

export const HistoryIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 503.379 503.379"
      width="24px"
      {...props}
    >
      <g>
        <path
          d="M458.091,128.116v326.842c0,26.698-21.723,48.421-48.422,48.421h-220.92c-26.699,0-48.421-21.723-48.421-48.421V242.439
          c6.907,1.149,13.953,1.894,21.184,1.894c5.128,0,10.161-0.381,15.132-0.969v211.594c0,6.673,5.429,12.104,12.105,12.104h220.92
          c6.674,0,12.105-5.432,12.105-12.104V128.116c0-6.676-5.432-12.105-12.105-12.105H289.835c0-12.625-1.897-24.793-5.297-36.315
          h125.131C436.368,79.695,458.091,101.417,458.091,128.116z M159.49,228.401c-62.973,0-114.202-51.229-114.202-114.199
          C45.289,51.229,96.517,0,159.49,0c62.971,0,114.202,51.229,114.202,114.202C273.692,177.172,222.461,228.401,159.49,228.401z
          M159.49,204.19c49.618,0,89.989-40.364,89.989-89.988c0-49.627-40.365-89.991-89.989-89.991
          c-49.626,0-89.991,40.364-89.991,89.991C69.499,163.826,109.87,204.19,159.49,204.19z M227.981,126.308
          c6.682,0,12.105-5.423,12.105-12.105s-5.423-12.105-12.105-12.105h-56.386v-47.52c0-6.682-5.423-12.105-12.105-12.105
          s-12.105,5.423-12.105,12.105v59.625c0,6.682,5.423,12.105,12.105,12.105H227.981z M367.697,224.456h-131.14
          c-6.682,0-12.105,5.423-12.105,12.105c0,6.683,5.423,12.105,12.105,12.105h131.14c6.685,0,12.105-5.423,12.105-12.105
          C379.803,229.879,374.382,224.456,367.697,224.456z M367.91,297.885h-131.14c-6.682,0-12.105,5.42-12.105,12.105
          s5.423,12.105,12.105,12.105h131.14c6.685,0,12.104-5.42,12.104-12.105S374.601,297.885,367.91,297.885z M367.91,374.353h-131.14
          c-6.682,0-12.105,5.426-12.105,12.105c0,6.685,5.423,12.104,12.105,12.104h131.14c6.685,0,12.104-5.42,12.104-12.104
          C380.015,379.778,374.601,374.353,367.91,374.353z"
        />
      </g>
    </svg>
  );
};

export const HomeIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498
        10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988
        14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const LogoutIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="0 0 24 24"
      width="24px"
      {...props}
    >
      <path
        d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 
      3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const SalesIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="800px"
      role="presentation"
      viewBox="0 0 24 24"
      width="800px"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2
      3H3.21922L6.78345 17.2569C5.73276 17.7236 5 18.7762 5 20C5 21.6569 6.34315 23 8 23C9.65685 23 11
      21.6569 11 20C11 19.6494 10.9398 19.3128 10.8293 19H15.1707C15.0602 19.3128 15 19.6494 15 20C15
      21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17H8.78078L8.28078
      15H18C20.0642 15 21.3019 13.6959 21.9887 12.2559C22.6599 10.8487 22.8935 9.16692 22.975 7.94368C23.0884
      6.24014 21.6803 5 20.1211 5H5.78078L5.15951 2.51493C4.93692 1.62459 4.13696 1 3.21922 1H2ZM18
      13H7.78078L6.28078 7H20.1211C20.6742 7 21.0063 7.40675 20.9794 7.81078C20.9034 8.9522 20.6906
      10.3318 20.1836 11.3949C19.6922 12.4251 19.0201 13 18 13ZM18 20.9938C17.4511 20.9938 17.0062 20.5489
      17.0062 20C17.0062 19.4511 17.4511 19.0062 18 19.0062C18.5489 19.0062 18.9938 19.4511 18.9938 20C18.9938
      20.5489 18.5489 20.9938 18 20.9938ZM7.00617 20C7.00617 20.5489 7.45112 20.9938 8 20.9938C8.54888 20.9938
      8.99383 20.5489 8.99383 20C8.99383 19.4511 8.54888 19.0062 8 19.0062C7.45112 19.0062 7.00617 19.4511 7.00617
      20Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const ArrowRightIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24px"
      role="presentation"
      viewBox="-3 0 32 32"
      width="24px"
      {...props}
    >
      <path
        d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113
      5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412
      12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z"
        fill="#000000"
      />
      <path
        d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z"
        fill="#000000"
      />
    </svg>
  );
};

export const ArrowUpLargeIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height={props.size || "24px"}
      role="presentation"
      viewBox="0 0 197.091 197.091"
      width={props.size || "24px"}
      {...props}
    >
      <g>
        <g>
          <g>
            <path
              d="M32.131,184.928L32.131,184.928c-18.388,0-31.573-2.505-32.131-2.616l0.734-7.648
				c32.349,0,55.555-8.45,68.964-25.098c15.174-18.835,13.532-43.34,12.394-51.811H25.918l85.588-85.592l85.585,85.592h-53.976
				C136.315,173.487,70.922,184.928,32.131,184.928z M44.564,90.028h43.912l0.673,3.028c0.311,1.432,7.476,35.341-13.381,61.302
				c-8.425,10.475-20.113,18.041-34.94,22.651c42.867-1.882,90.753-18.714,94.861-83.362l0.229-3.618h42.527l-66.939-66.946
				L44.564,90.028z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const PrintIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height={props.size || "24px"}
      role="presentation"
      viewBox="0 0 24 24"
      width={props.size || "24px"}
      {...props}
    >
      <g id="print">
        <g>
          <path d="M19,24H5v-4H0V6h5V0h14v6h5v14h-5V24z M7,22h10v-6H7V22z M19,18h3V8H2v10h3v-2H4v-2h16v2h-1V18z M7,6h10V2H7V6z" />
        </g>
        <g>
          <rect height="2" width="2" x="18" y="10" />
        </g>
      </g>
    </svg>
  );
};

export const ReportIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height={props.size || "24px"}
      role="presentation"
      viewBox="0 0 24 24"
      width={props.size || "24px"}
      {...props}
    >
      <g>
        <g>
          <path
            d="M8.5,9C8.2,9,8,9.2,8,9.5V10c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3h0.5c0.3,0,0.5-0.2,0.5-0.5C12,10.6,10.4,9,8.5,9z
			 M9,10.1c1,0.2,1.8,1,1.9,1.9H9V10.1z M8,15c-1.1,0-2-0.9-2-2s0.9-2,2-2v1.5C8,12.8,8.2,13,8.5,13H10C10,14.1,9.1,15,8,15z"
          />
        </g>
        <g>
          <path
            d="M17.5,22h-11C5.7,22,5,21.3,5,20.5v-2C5,17.7,5.7,17,6.5,17h11c0.8,0,1.5,0.7,1.5,1.5v2C19,21.3,18.3,22,17.5,22z M6.5,18
			C6.2,18,6,18.2,6,18.5v2C6,20.8,6.2,21,6.5,21h11c0.3,0,0.5-0.2,0.5-0.5v-2c0-0.3-0.2-0.5-0.5-0.5H6.5z"
          />
        </g>
        <g>
          <path d="M18.5,16h-6c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h6c0.3,0,0.5,0.2,0.5,0.5S18.8,16,18.5,16z" />
        </g>
        <g>
          <path d="M18.5,14h-5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h5c0.3,0,0.5,0.2,0.5,0.5S18.8,14,18.5,14z" />
        </g>
        <g>
          <path d="M18.5,12h-5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h5c0.3,0,0.5,0.2,0.5,0.5S18.8,12,18.5,12z" />
        </g>
        <g>
          <path d="M18.5,10h-6C12.2,10,12,9.8,12,9.5S12.2,9,12.5,9h6C18.8,9,19,9.2,19,9.5S18.8,10,18.5,10z" />
        </g>
        <g>
          <path d="M18.5,8h-6C12.2,8,12,7.8,12,7.5S12.2,7,12.5,7h6C18.8,7,19,7.2,19,7.5S18.8,8,18.5,8z" />
        </g>
        <path
          d="M19.5,0h-8.6c-0.4,0-0.8,0.2-1.1,0.4L3.4,6.9C3.2,7.1,3,7.5,3,7.9v14.6C3,23.3,3.7,24,4.5,24h15c0.8,0,1.5-0.7,1.5-1.5v-21
      C21,0.7,20.3,0,19.5,0z M11,3h6.5C17.8,3,18,3.2,18,3.5v1C18,4.8,17.8,5,17.5,5H11V3z M10,1.7v4.8C10,6.8,9.8,7,9.5,7H4.7L10,1.7z
      M20,22.5c0,0.3-0.2,0.5-0.5,0.5h-15C4.2,23,4,22.8,4,22.5V8h5.5C10.3,8,11,7.3,11,6.5V6h6.5C18.3,6,19,5.3,19,4.5v-1
      C19,2.7,18.3,2,17.5,2H11V1h8.5C19.8,1,20,1.2,20,1.5V22.5z"
        />
      </g>
    </svg>
  );
};
