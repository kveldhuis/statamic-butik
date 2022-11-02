<html>

<head>
    <style>
        header {
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        body {
            size: A4;
            margin: 0;
        }

        * {
            font-family: arial;
            font-size: 12px;
        }

        th {
            background-color: gray;
            color: white;
            font-weight: bold;
        }

        td {
            vertical-align: top;
        }

        .store-info div {
            font-size: 1.2em;
        }

        .store-info div.company-name {
            font-size: 1.5em;
            font-weight: bold;
        }

        table.order-info td {

            padding: 2px 4px 2px 4px;
        }

        table.order-info tr td.label {
            font-weight: bold;
            text-align: right;
            border-right: solid 1px #c0c0c0;

        }

        table.order-info tr td.label.first {
        }

        table.order-info tr td.label.last {
        }

        table.line-items {
            margin-top: 0.1in;
            padding: 0.1in 0in 0.1in 0in;
        }

        table.line-items th {
            padding: 2px;
        }

        table.line-items {
            border-bottom: solid 1px #707070;
        }

        table.footer td.label {
            font-weight: bold;
            text-align: right;
        }

        td.notes {
            padding: 0.1in;
            font-style: italic;
        }

        .barcode {
            font-family: "Free 3 of 9 Extended";
            font-size: 48pt;
        }
    </style>
</head>
<body>
<!-- Order Header - THIS SECTION CAN BE MODIFIED AS NEEDED -->
<header style="width:100%;text-align:center;">
    <img src="https://spelkwartier.nl/images/logo%20icon%202.png" style="display:inline-block;margin: 0 auto; height: 210px; width: 120px;"><br>
</header>
<table cellspacing=0 cellpadding="2" border=0>
    <tbody>
    <tr>
        <td colspan="2" style="width:4.5in" class="store-info">
            <div class="company-name">{{ config('butik.name') }}</div>
            <div>{{ config('butik.address1') }}<br/>{{ config('butik.zip_city') }}</div>
        </td>
        <td style="width:3.5in;" align="right" valign="top">

        </td>
    </tr>
    <tr>
        <td style="height:0.15in"></td>
    </tr>
    <tr>
        <td align="right" style="width:1in">
            <b>Vezenden naar:</b>
        </td>
        <td style="width:3.5in; font-size:14px">
            <div>{{ sprintf('%s %s', $order['customer']->firstname, $order['customer']->surname) }}</div>
            <div>{!! sprintf('%s <br />%s, %s', $order['customer']->address1, $order['customer']->zip, $order['customer']->city) !!}</div>
        </td>
        <td style="width:2.5in">
            <table cellspacing="0" border="0" class="order-info">
                <tr>
                    <td align="right" class="label first">Order #</td>
                    <td>{{ $order['id'] }}</td>
                </tr>
                <tr>
                    <td align="right" class="label">Besteldatum</td>
                    <td>{{ \Carbon\Carbon::parse($order['created_at'])->format('d-m-Y') }}</td>
                </tr>
                <tr>
                    <td align="right" class="label last">Track & Trace</td>
                    <td>{{ $order['track_and_trace'] ?? '' }}</td>
                </tr>
            </table>
        </td>
    </tr>
    </tbody>
</table>

<!-- END Order Header -->

<table cellspacing=0 cellpadding="2" border="0" style="width:100%" class="line-items">
    <thead>

    <!-- Order Items Header - THIS SECTION CAN BE MODIFIED AS NEEDED -->
    <tr>
        <th align="left" style="width:1.5in" class="sku">
            Productnaam
        </th>
        <th align="left" style="width:1.5in" class="sku">
            Artikelcode
        </th>
        <th align="right" style="width:0.75in" class="price">
            Prijs
        </th>
        <th align="center" style="width:0.75in">
            Aantal
        </th>
        <th align="right" style="width:0.75in" class="price">
            Totaal
        </th>
    </tr>

    <!-- END Order Items Header -->

    </thead>
    <tbody>

    <!-- Order Items - THIS SECTION CAN BE MODIFIED AS NEEDED -->
    @foreach ($order['items'] as $product)
        @php
            $productEntry = Statamic\Facades\Entry::query()
                ->where('collection', 'products')
                ->where('slug', $product->slug)
                ->first();
        @endphp
        <tr>
            <td class="sku">{{ $product->name }}</td>
            <td class="sku">{{ $productEntry?->article_number ?? '' }}</td>
            <td align="right" class="price">&euro; {{ $product->singlePrice }}</td>
            <td align="center">{{ $product->quantity }}</td>
            <td align="right" class="price">&euro;{{ $product->totalPrice }}</td>
        </tr>
    @endforeach
    <!-- END Order Items -->

    </tbody>
</table>

<!-- Order Footer - THIS SECTION CAN BE MODIFIED AS NEEDED -->

<table cellspacing=0 cellpadding="2" border="0" style="width:100%" class="footer">
    <p>
{{--        [Notes to Buyer]--}}
    </p>
    <tbody>
    <tr>
        <td align="right" class="label price">
            Sub Totaal:
        </td>
        <td style="width:0.75in" align="right" class="price">
            &euro;{{ array_reduce($order['items'], function ($subTotal, $item) {
                return $subTotal + (float) str_replace(['.', ','], ['', '.'], $item->totalPrice);
        }, 0) }}
        </td>
    </tr>
    <tr>
    <tr class="tax">
        <td align="right" class="label price">
            Btw:
        </td>
        <td style="width:0.75in" align="right" class="price">
            &euro;{{ array_reduce($order['items'], function ($subTotal, $item) {
                return $subTotal + (float) str_replace(['.', ','], ['', '.'], $item->taxRate);
        }, 0) }}
        </td>
    </tr>
    <tr>
        <td align="right" class="label price">
            Verzendkosten:
        </td>
        <td style="width:0.75in" align="right" class="price">
            &euro;{{ current($order['shippings'])->total }}
        </td>
    </tr>
    <tr>
        <td align="right" class="label price">
            Total:
        </td>
        <td style="width:0.75in" align="right" class="price">
            &euro; {{$order['total_amount']}}
        </td>
    </tr>
    </tbody>
</table>

<!-- END Order Footer -->

</div>

</body>

</html>
