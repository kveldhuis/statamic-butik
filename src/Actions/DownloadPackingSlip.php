<?php

namespace Jonassiewertsen\StatamicButik\Actions;

use Barryvdh\DomPDF\Facade\Pdf;
use Jonassiewertsen\StatamicButik\Http\Models\Order;
use Statamic\Actions\Action;

class DownloadPackingSlip extends Action
{
    public static function title()
    {
        return __('Download pakbon');
    }

    public function visibleTo($item)
    {
        return $item instanceof Order;
    }

    public function run($items, $values)
    {
        return Pdf::loadView('butik::cp.orders.pdf.packing-slip', ['order' => $items])
            ->download('packing-slip.pdf');
    }
}
