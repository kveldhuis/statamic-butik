<?php

namespace Jonassiewertsen\StatamicButik\Actions;

use Barryvdh\DomPDF\Facade\Pdf;
use Jonassiewertsen\StatamicButik\Http\Models\Order;
use Statamic\Actions\Action;

class CancelButikOrder extends Action
{
    protected $dangerous = true;

    public static function title()
    {
        return __('Annuleer order');
    }

    public function visibleTo($item)
    {
        return $item instanceof Order;
    }

    public function run($items, $values)
    {
        $items->each->status = 'cancelled';
        $items->each->save();
        return Pdf::loadView('butik::cp.orders.pdf.packing-slip', ['order' => $items])
            ->download('packing-slip.pdf');
    }
}
