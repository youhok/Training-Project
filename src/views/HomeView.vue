<template>
  <div class="container-fluid  mt-5">
    <div class="d-flex justify-content-between">
      <h1>Seller</h1>
      <select
        v-model="selectedCategory"
        class="form-select form-select-lg mb-3"
        aria-label="select example"
      >
        <option value="all">All Categories</option>
        <option value="Beer">Beer</option>
        <option value="Soft Drink">Soft Drink</option>
      </select>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">item</th>
          <th scope="col">category</th>
          <th scope="col">qty</th>
          <th scope="col">price</th>
          <th scope="col">amount</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(item ,index) in filteredItems" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.item }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const data = ref([
  { item: "ABC", category: "Beer", qty: 100, price: 11, amount: 1100 },
  { item: "Angkor", category: "Beer", qty: 50, price: 5.9, amount: 295 },
  { item: "Fanta", category: "Soft Drink", qty: 50, price: 4.2, amount: 210 },
  { item: "Pepsi", category: "Soft Drink", qty: 60, price: 2, amount: 120 },
  { item: "Coca Cola", category: "Soft Drink", qty: 80, price: 3, amount: 240 },
  { item: "Krud", category: "Beer", qty: 100, price: 8, amount: 800 },
  { item: "Hanuman", category: "Beer", qty: 70, price: 10.2, amount: 714 },
  { item: "Cambodia", category: "Beer", qty: 300, price: 10, amount: 3000 },
  { item: "Sprite", category: "Soft Drink", qty: 80, price: 4, amount: 320 },
  { item: "ABC", category: "Beer", qty: 80, price: 11, amount: 880 },
  { item: "Krud", category: "Beer", qty: 30, price: 8, amount: 240 },
  { item: "Fanta", category: "Soft Drink", qty: 90, price: 4.2, amount: 378 },
  { item: "7up", category: "Beer", qty: 70, price: 3.8, amount: 266 },
  { item: "7up", category: "Beer", qty: 60, price: 3.8, amount: 228 },
  { item: "Cambodia", category: "Beer", qty: 30, price: 10, amount: 300 },
  { item: "Hanuman", category: "Beer", qty: 60, price: 10.2, amount: 612 },
  { item: "Vatanac", category: "Beer", qty: 0, price: 10.2, amount: 0 },
  { item: "Sprite", category: "Soft Drink", qty: 20, price: 4, amount: 80 },
  { item: "Olate", category: "Soft Drink", qty: 20, price: 10.2, amount: 204 },
  { item: "Olate", category: "Soft Drink", qty: 0, price: 10.2, amount: 0 },
  { item: "ABC", category: "Beer", qty: 30, price: 11, amount: 330 },
]);

const selectedCategory = ref("all");

const filteredItems = computed(() => {
  // Filter based on selected category and combine items with same name
  return data.value.reduce((acc, item) => {
    const existingItem = acc.find((existing) => existing.item === item.item);
    if (existingItem) {
      existingItem.qty += item.qty;
      existingItem.amount += item.amount;
    } else {
      // Only add if it matches the selected category (or "all")
      if (selectedCategory.value === "all" || selectedCategory.value === item.category) {
        acc.push({ ...item });
      }
    }
    return acc;
  }, []);
});

//sort array A-Z
filteredItems.value.sort((a, b) => (a.item < b.item ? -1 : 1));

</script>


<style scope>
.form-select {
  width: 200px;
}
</style>