import { cn } from '@/lib/utils'

const Title = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;

}) => {
    return (
        <h2 className ={cn("text-3xl font-bold text-black capitalize tracking-wide", className)}>
            {children}
        </h2>
    );
};

const SubTitle = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;

}) => {
    return (
        <h2 className ={cn("font-semibold text-black font-poppins capitalize", className)}>
            {children}
        </h2>
    );
};

const SubText = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;

}) => {
    return (
        <h2 className ={cn("text-neutral-800 text-sm font-poppins", className)}>
            {children}
        </h2>
    );
};

export {Title, SubTitle, SubText};