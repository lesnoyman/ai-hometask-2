<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types/user'

const props = defineProps<{ user: User | null; open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const mapUrl = computed(() => {
  if (!props.user) return '#'
  const { lat, lng } = props.user.address.geo
  return `https://www.google.com/maps?q=${lat},${lng}`
})
</script>

<template>
  <div v-if="props.open" :class="$style.overlay" @click="emit('close')">
    <div :class="$style.modal" @click.stop>
      <button :class="$style.closeBtn" @click="emit('close')">×</button>
      <div :class="$style.header">
        <div :class="$style.name">{{ props.user?.name }}</div>
        <a :href="`mailto:${props.user?.email}`" :class="$style.email">{{ props.user?.email }}</a>
      </div>
      <div :class="$style.section">
        <div :class="$style.sectionTitle">Address</div>
        <div :class="$style.sectionInfo">{{ props.user?.address.street }}, {{ props.user?.address.suite }}</div>
        <div :class="$style.sectionInfo">{{ props.user?.address.city }}, {{ props.user?.address.zipcode }}</div>
        <a :href="mapUrl" target="_blank" :class="$style.mapLink">
          <span :class="$style.mapIcon">📍</span> <span :class="$style.mapText">View on map</span>
        </a>
      </div>
      <div :class="$style.section">
        <div :class="$style.sectionTitle">Contact</div>
        <div :class="$style.sectionInfo"><b>Phone:</b> {{ props.user?.phone }}</div>
        <div :class="$style.sectionInfo"><b>Website:</b> <a :href="'http://' + props.user?.website" target="_blank" :class="$style.website">{{ props.user?.website }}</a></div>
      </div>
      <div :class="$style.section">
        <div :class="$style.sectionTitle">Company</div>
        <div :class="$style.sectionInfo"><b>Name:</b> {{ props.user?.company.name }}</div>
        <div :class="$style.sectionInfo"><b>Catchphrase:</b> {{ props.user?.company.catchPhrase }}</div>
        <div :class="$style.sectionInfo"><b>Business:</b> {{ props.user?.company.bs }}</div>
      </div>
    </div>
  </div>
</template>

<style module scoped>
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(55, 65, 81, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.modal {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
  max-width: 480px;
  width: 100%;
  padding: 44px 36px 32px 36px;
  position: relative;
  animation: modalIn 0.28s cubic-bezier(.4,1.6,.6,1) both;
  text-align: left;
  transition: box-shadow 0.2s, transform 0.2s;
  word-break: break-word;
  box-sizing: border-box;
  margin: 0 auto;
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.96) translateY(24px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.closeBtn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 5px 0;
  border-radius: 50%;
}
.closeBtn:hover, .closeBtn:focus {
  color: #111;
  background: #f3f4f6;
  outline: none;
}
.closeBtn:active {
  color: #ef4444;
  background: #f1f5f9;
  outline: none;
}
.header {
  margin-bottom: 28px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 18px;
}
.name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #222;
}
.email {
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.18s;
}
.email:hover, .email:focus {
  color: #1749b1;
  text-decoration: underline;
}
.section {
  margin-bottom: 28px;
  padding-bottom: 0;
  border-bottom: none;
  font-size: 1rem;
}
.section:last-of-type {
  margin-bottom: 0;
  padding-bottom: 0;
}
.sectionTitle {
  font-weight: 600;
  margin-bottom: 10px;
  color: #222;
  font-size: 1.15rem;
}
.sectionInfo {
  font-size: 0.95rem;
}
.mapLink {
  color: #2563eb;
  font-size: 0.875rem;
  text-decoration: none;
  margin-top: 4px;
  display: inline-block;
  cursor: pointer;
  transition: color 0.18s;
}
.mapIcon {
  font-size: 1em;
  vertical-align: middle;
}
.mapText {
  text-decoration: none;
  transition: text-decoration 0.18s;
}
.mapLink:hover .mapText, .mapLink:focus .mapText {
  text-decoration: underline;
}
.website {
  color: #2563eb;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.18s;
}
.website:hover, .website:focus {
  color: #1749b1;
  text-decoration: underline;
}
.section b {
  font-weight: 600;
  color: #222;
}
@media (max-width: 900px) {
  .modal {
    max-width: 30rem;
  }
}
@media (max-width: 600px) {
  .modal {
    max-width: 20rem;
    width: 100%;
    min-width: 0;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  .name {
    font-size: 1.1rem;
  }
  .closeBtn {
    width: 32px;
    height: 32px;
    font-size: 1.5rem;
  }
}
</style> 