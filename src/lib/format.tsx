
export function banglaDate(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}


export function taka(value: number): string {
  return `৳ ${value.toLocaleString("bn-BD")}`;
}

export function percent(value: number): string {
  const formatted = Math.abs(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

  return `${formatted}%`;
}
