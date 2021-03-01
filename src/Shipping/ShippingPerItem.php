<?php

namespace Jonassiewertsen\StatamicButik\Shipping;

use Jonassiewertsen\StatamicButik\Facades\Price;

class ShippingPerItem extends ShippingType
{
    /**
     * The shipping costs are equal to the shipping price
     * of the selected shipping rate.
     */
    public function shippingCosts(): string
    {
        return Price::of($this->rate->price)
                ->multiply($this->itemCount)
                ->amount();
    }
}
