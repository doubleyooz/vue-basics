<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap">
        <form @submit.prevent="submitForm" class="invoice-content">
            <h1>New Invoice</h1>

            <div class="bill-from">
                <h4>Bill From</h4>
                <div class="input">
                    <label for="billerStreetAddress">Street Address</label>
                    <input
                        required
                        type="text"
                        id="billerStreetAddress"
                        v-model="billerStreetAddress"
                    />
                </div>

                <div class="location-details">
                    <div class="input">
                        <label for="billerCity">City</label>
                        <input
                            required
                            type="text"
                            id="billerCity"
                            v-model="billerCity"
                        />
                    </div>
                    <div class="input">
                        <label for="billerZipCode">Zip Code</label>
                        <input
                            required
                            type="text"
                            id="billerZipCode"
                            v-model="billerZipCode"
                        />
                    </div>
                    <div class="input">
                        <label for="billerCountry">Country</label>
                        <input
                            required
                            type="text"
                            id="billerCountry"
                            v-model="billerCountry"
                        />
                    </div>
                </div>
            </div>

            <div class="bill-to">
                <h4>Bill To</h4>
                <div class="input">
                    <label for="clientName">Client's Name</label>
                    <input
                        required
                        type="text"
                        id="clientName"
                        v-model="clientName"
                    />
                </div>
                <div class="input">
                    <label for="clientEmail">Client's Email</label>
                    <input
                        required
                        type="text"
                        id="clientEmail"
                        v-model="clientEmail"
                    />
                </div>
                <div class="input">
                    <label for="clientStreetAddress"
                        >Client's Street Address</label
                    >
                    <input
                        required
                        type="text"
                        id="clientStreetAddress"
                        v-model="clientStreetAddress"
                    />
                </div>

                <div class="location-details">
                    <div class="input">
                        <label for="clientCity">City</label>
                        <input
                            required
                            type="text"
                            id="clientCity"
                            v-model="clientCity"
                        />
                    </div>
                    <div class="input">
                        <label for="clientZipCode">Zip Code</label>
                        <input
                            required
                            type="text"
                            id="clientZipCode"
                            v-model="clientZipCode"
                        />
                    </div>
                    <div class="input">
                        <label for="clientCountry">Country</label>
                        <input
                            required
                            type="text"
                            id="clientCountry"
                            v-model="clientCountry"
                        />
                    </div>
                </div>
            </div>

            <div class="invoice-work">
                <div class="payment">
                    <div class="input">
                        <label for="invoiceDate">Invoice Date</label>
                        <input
                            disabled
                            type="text"
                            id="invoiceDate"
                            v-model="invoiceDate"
                        />
                    </div>

                    <div class="input">
                        <label for="paymentDue">Payment Due</label>
                        <input
                            disabled
                            type="text"
                            id="paymentDue"
                            v-model="paymentDue"
                        />
                    </div>
                </div>
                <div class="input">
                    <label for="paymentTerms">Payment Terms</label>
                    <select
                        required
                        type="text"
                        id="paymentTerms"
                        v-model="paymentTerms"
                    >
                        <option value="30">Net 30 DAys</option>
                        <option value="60">Net 60 DAys</option>
                        <option value="90">Net 90 DAys</option>
                    </select>
                </div>
                <div class="input">
                    <label for="productDescription">Product Description</label>
                    <input
                        required
                        type="text"
                        id="productDescription"
                        v-model="productDescription"
                    />
                </div>
                <div class="work-items">
                    <h3>Item List</h3>
                    <table class="item-list">
                        <tr class="table-heading">
                            <th class="item-name">Item Name</th>
                            <th class="quant">Quant</th>
                            <th class="price">Price</th>
                            <th class="total">Total</th>
                        </tr>
                        <tr
                            class="table-items"
                            v-for="{ item, index } in invoiceItemList"
                            :key="index"
                        >
                            <td class="item-name">
                                <input type="text" v-model="item.itemName" />
                            </td>
                            <td class="quant">
                                <input type="text" v-model="item.quant" />
                            </td>
                            <td class="price">
                                <input type="text" v-model="item.price" />
                            </td>
                            <td class="total">
                                ${{ (item.total = item.quant * item.price) }}
                            </td>
                            <unicon
                                @click="deleteInvoiceItem(item.id)"
                                name="close"
                                fill="purple"
                            />
                        </tr>
                    </table>
                    <div @click="addNewInvoice" class="button">
                        <unicon name="plus" fill="white" />
                        Add New Item
                    </div>
                </div>
                <div class="footer">
                    <div class="left">
                        <button @click="closeInvoice" class="red">
                            Cancel
                        </button>
                    </div>
                    <div class="right">
                        <button @click="saveDraft" class="dark-purple">
                            Save Draft
                        </button>
                        <button @click="publishInvoice" class="purple">
                            Create Invoice
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'invoiceModel',
    data() {
        return {
            billerStreetAddress: null,
            billetCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDate: null,
            paymentDueDateUnix: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0,
        };
    },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
    display: flex;
    flex-direction: column;

    .bill-from,
    .bill-to,
    .input,
    .invoice-work {
        display: flex;
        flex-direction: column;
    }

    .location-details {
        display: flex;
    }

    .payment {
        display: flex;
    }

    .table-heading {
        display: flex;
    }

    .table-items {
        display: flex;
    }

    .button {
        display: flex;
        align-items: center;
    }

    .footer {
        display: flex;
    }
}
</style>
