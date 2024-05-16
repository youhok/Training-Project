<template>
    <div class="container-fluid  mt-5">
    <div class="d-flex justify-content-between">
      <h1>Customer</h1>
      <select
        v-model="selected"
        class="form-select form-select-lg mb-3"
        aria-label="select example"
      >
        <option value="all">All customer</option>
      
        <option v-for="customer in uniqueEmployeeNames" :key="customer" :value="customer">
          {{ customer }}
        </option>   
      </select>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">NO</th>
          <th scope="col">Date</th>
          <th scope="col">Customer</th>
          <th scope="col">Employee</th>
          <th scope="col">Amount</th>
          <th scope="col">Discount</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(transaction, index) in filteredTransactions" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ transaction.tranDate }}</td>
          <td>{{ transaction.customerName }}</td>
          <td>{{ transaction.employeeName }}</td>
          <td>{{ transaction.subTotal }}</td>
          <td>{{ transaction.discount }}</td>
          <td>{{ transaction.total }}</td>
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import data from "../data/dataseller.json";


const transactions = ref(data);
// console.log(transactions.value);
const selected = ref("all");

const uniqueEmployeeNames = computed(() => {
  // Get unique employee names from transactions
  const customerNames = transactions.value.map(transaction => transaction.customerName);
  return [...new Set(customerNames)];
});


const filteredTransactions = computed(() => {
  if (selected.value === "all") {
    return transactions.value;
  } else {
    return transactions.value.filter(
      transaction =>
        transaction.customerName=== selected.value &&
        transaction.employeeName !== "អ៊ំ ទូច /Um Toch"
    );
  }
});

</script>

<style scoped>

</style>