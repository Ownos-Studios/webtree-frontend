export const User = () => {
  return (
    <div className="flex w-full gap-[16px] justify-center mt-[36px] border-b-[1px] pb-[19px] border-[#181818]">
      <picture>
        <img
          className="w-[120px] h-[120px] rounded-2xl"
          src="/user.png"
          alt=""
        />
      </picture>
      <span>
        <h1 className="text-[24px] font-semibold leading-[24px]">
          Padmesh Srijith
        </h1>
        <p className="text-[#575A5C] ">srijithpadmesh@gmail.com</p>
        <p className="text-[#575A5C] ">0x45b5....67m4</p>
        <span className="flex flex-col border-t-[1px] border-[#18181833] pt-[4px] mt-1">
          <h3 className="flex items-center">
            <svg
              className="mr-[8px]"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              fill="none"
              viewBox="0 0 16 17"
            >
              <path
                stroke="#181818"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.333"
                d="M5.333 14.5V5.167c0-.62 0-.93.069-1.185a2 2 0 011.414-1.414C7.07 2.5 7.38 2.5 8 2.5s.93 0 1.184.068A2 2 0 0110.6 3.982c.068.255.068.565.068 1.185V14.5m-7.2 0h9.066c.747 0 1.12 0 1.406-.145.25-.128.455-.332.582-.583.146-.285.146-.659.146-1.405V7.3c0-.747 0-1.12-.146-1.405a1.333 1.333 0 00-.582-.583c-.286-.145-.659-.145-1.406-.145H3.467c-.747 0-1.12 0-1.406.145-.25.128-.454.332-.582.583-.146.285-.146.658-.146 1.405v5.067c0 .746 0 1.12.146 1.405.128.25.331.455.582.583.286.145.659.145 1.406.145z"
              ></path>
            </svg>
            Company: Questbook
          </h3>
          <h3 className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              fill="none"
              viewBox="0 0 16 17"
              className="mr-[8px]"
            >
              <g clipPath="url(#clip0_702_1336)">
                <path
                  fill="#181818"
                  fillRule="evenodd"
                  d="M12.256 15.686c.215.152.491.19.738.097a.774.774 0 00.483-.56c.579-2.723 1.984-9.614 2.512-12.091a.52.52 0 00-.174-.505.534.534 0 00-.531-.094C12.489 3.568 3.88 6.798.361 8.1A.551.551 0 000 8.633c.008.236.167.44.395.509 1.578.472 3.65 1.129 3.65 1.129s.968 2.923 1.472 4.41c.064.186.21.333.402.384a.578.578 0 00.541-.138l2.064-1.949s2.381 1.746 3.732 2.708zm-7.34-5.785l1.12 3.692.248-2.338 6.79-6.124a.185.185 0 00.022-.251.19.19 0 00-.25-.043l-7.93 5.064z"
                  clipRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_702_1336">
                  <path
                    fill="#fff"
                    d="M0 0H16V16H0z"
                    transform="translate(0 .5)"
                  ></path>
                </clipPath>
              </defs>
            </svg>
            Telegram: @srijith4206911
          </h3>
        </span>
      </span>
    </div>
  );
};
