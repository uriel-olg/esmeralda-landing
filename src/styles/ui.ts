/** Shared Tailwind compositions. Component class markers are kept separately for tests. */
export const container = 'container mx-auto w-full px-[40px] compact:px-[30px] tablet:px-[24px] mobile:px-[20px] small:px-[16px]';

export const eyebrow = 'text-[10px] font-medium tracking-[2.3px] text-olive uppercase';

const buttonLayout = 'inline-flex items-center justify-center rounded-[40px] border font-medium leading-[1.6] [transition:background_.22s,transform_.22s] [&_svg]:size-[16px] fine:hover:[transform:translateY(-2px)]';
const buttonSizing = 'gap-[15px] px-[22px] py-[13px] text-[12px]';
/** Use this without button when a component needs its own padding, gap or text size. */
export const buttonBase = `${buttonLayout} border-transparent`;
export const button = `${buttonBase} ${buttonSizing}`;
export const primaryButton = `${button} bg-forest text-white fine:hover:bg-[#223a26]`;
export const outlineButton = `${buttonLayout} ${buttonSizing} border-[#8c9a82] text-forest fine:hover:bg-[#ffffff80]`;

export const textLink = 'inline-flex items-center gap-[10px] py-[4px] text-[11px] font-medium whitespace-nowrap text-forest [&_svg]:size-[17px] [&_svg]:[transition:transform_.2s] fine:hover:[&_svg]:[transform:translateX(4px)] mobile:gap-[6px] mobile:text-[10px] mobile:[&_svg]:w-[14px]';
export const iconButton = 'relative grid place-items-center rounded-[5px] bg-transparent p-[7px]';

export const section = 'py-[51px] mobile:py-[34px]';
export const sectionHeading = 'flex items-end justify-between gap-[20px] mb-[27px] [&_.eyebrow]:mb-[7px] mobile:mb-[20px] mobile:gap-[12px] mobile:[&_.eyebrow]:mb-[5px] mobile:[&_.eyebrow]:text-[8px] mobile:[&_.eyebrow]:tracking-[1.6px] small:[&_.text-link]:max-w-[100px] small:[&_.text-link]:whitespace-normal small:[&_.text-link]:text-right';
export const demoNote = 'mt-[21px] text-center text-[10px] text-muted mobile:mt-[18px] mobile:text-[9px]';
export const productGrid = 'grid grid-cols-5 gap-[15px] compact:gap-[12px] tablet:grid-cols-3 tablet:gap-[15px] mobile:grid-cols-2 mobile:gap-[12px]';
