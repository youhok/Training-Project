<template>
  <div class="container-fluid mt-5">
    <div class="d-flex justify-content-between">
      <h1>Customer</h1>

      <div class="d-flex gap-3">
        <!-- Select for filtering by customer name -->
        <select
          v-model="selectedCustomer"
          class="form-select form-select-lg mb-3"
          aria-label="select customer"
        >
          <option value="all">All Customers</option>
          <option
            v-for="customer in uniqueCustomerNames"
            :key="customer"
            :value="customer"
          >
            {{ customer }}
          </option>
        </select>

        <!-- Select for filtering by transaction type -->
        <select
          v-model="selectedTransactionType"
          class="form-select form-select-lg mb-3"
          aria-label="select transaction type"
        >
          <option value="all">All Transactions</option>
          <option value="Invoice">Invoice</option>
          <option value="Cash_Sale">Cash Sale</option>
        </select>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Date</th>
          <th scope="col">TranType</th>
          <th scope="col">Employee</th>
          <!-- <th scope="col">Item</th> -->
          <th scope="col">Qty</th>
          <th scope="col">Discount</th>
          <!-- <th scope="col">Price</th> -->
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <template v-for="(group, index) in groupedTransactions" :key="index">
          <tr>
            <td colspan="7">
              <strong>{{ index + 1 }} {{ group.customerName }}</strong>
            </td>
          </tr>
          <tr v-for="(transaction, i) in group.transactions" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ transaction.tranDate }}</td>
            <td>{{ transaction.tranType }}</td>      
            <td>{{ transaction.employeeName }}</td>
            <td>{{ transaction.subTotal }}</td>
            <td>{{ transaction.discount }}</td>
            <!-- <td>{{ transaction.price }}</td> -->
            <td>{{ transaction.total }}</td>
          </tr>
          <tr>
            <td colspan="4"><strong>Total</strong></td>
            <td><strong>{{ group.totalQty }}</strong></td>
            <td></td>
            <!-- <td></td> -->
            <td><strong>{{ group.totalAmount }}</strong></td>
          </tr>
        </template>
        <tr>
          <td colspan="6"><strong>Overall Total</strong></td>
          <td><strong>{{ overallTotal }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

import { ref, computed } from "vue";
import data from "../data/dataseller.json";

const transactions = ref(data);

const selectedCustomer = ref("all");
const selectedTransactionType = ref("all");

const uniqueCustomerNames = computed(() => {
  const customerNames = transactions.value.map(
    (transaction) => transaction.customerName
  );
  return [...new Set(customerNames)];
});

const filteredTransactions = computed(() => {
  let filtered = transactions.value;

  if (selectedCustomer.value !== "all") {
    filtered = filtered.filter(
      (transaction) => transaction.customerName === selectedCustomer.value
    );
  }

  if (selectedTransactionType.value !== "all") {
    filtered = filtered.filter(
      (transaction) => transaction.tranType === selectedTransactionType.value
    );
  }

  filtered = filtered.filter(
    (transaction) =>
      transaction.tranType === "Invoice" || transaction.tranType === "Cash_Sale"
  );

  return filtered;
});

const groupedTransactions = computed(() => {
  const groups = {};

  filteredTransactions.value.forEach((transaction) => {
    if (!groups[transaction.customerName]) {
      groups[transaction.customerName] = {
        customerName: transaction.customerName,
        transactions: [],
        totalQty: 0,
        totalAmount: 0,
      };
    }
    groups[transaction.customerName].transactions.push(transaction);
    groups[transaction.customerName].totalQty += transaction.subTotal;
    groups[transaction.customerName].totalAmount += transaction.total;
  });

  // Format totals to whole numbers
  for (const group of Object.values(groups)) {
    group.totalAmount = Math.round(group.totalAmount);
    group.totalQty = Math.round(group.totalQty);
  }

  return Object.values(groups);
});

const overallTotal = computed(() => {
  return Math.round(groupedTransactions.value.reduce(
    (sum, group) => sum + group.totalAmount,
    0
  ));
});
</script>



<style>
/* Add your table styling here */
</style>
