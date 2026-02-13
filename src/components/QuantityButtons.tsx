import React from 'react'
import useStore from '@/store'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Plus, Minus } from 'lucide-react'
import { Product } from '@/src/types/product'
import { toast } from 'sonner'

interface Props {
    product: Product;
    className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
    const addItem = useStore((state) => state.addItem);
    const removeItem = useStore((state) => state.removeItem);
    const itemCount = useStore((state) => {
    const item = state.items.find(
        (item) => item.product.id.toString() === product?.id.toString()
    );
    return item?.quantity || 0;
    });
    
    const handleRemoveProduct = () => {
        removeItem(product?.id.toString());
        if (itemCount > 1) {
            toast.success("Quantity decreased!", {
                description: `${product?.title}`
            });
        } else {
            toast.success("Removed from cart!", {
                description: `${product?.title}`,
                descriptionClassName: "text-darkColor"
            });
        }
    };
    
    const handleAddToCart = () => {
        addItem(product);
        toast.success("Quantity increased!", {
            description: `${product?.title}`,
            descriptionClassName: "text-darkColor"
        });
    };

    return (
        <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
            <Button
                onClick={handleRemoveProduct}
                variant="outline"
                size="icon"
                disabled={itemCount === 0}
                className="w-6 h-6 border hover:bg-revoshop-accent/20 hoverEffect"
            >
                <Minus className="w-3 h-3" />
            </Button>
            <span className="font-semibold text-sm w-6 text-center text-darkColor">
                {itemCount}
            </span>
            <Button
                onClick={handleAddToCart}
                variant="outline"
                size="icon"
                className="w-6 h-6 border hover:bg-revoshop-accent/20 hoverEffect"
            >
                <Plus className="w-3 h-3" />
            </Button>
        </div>
    );
};

export default QuantityButtons;