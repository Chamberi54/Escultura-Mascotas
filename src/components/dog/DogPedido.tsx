import DogOrderForm from "./DogOrderForm";

export default function DogPedido() {
  return (
    <section className="border-t border-line bg-paper-dim py-24" id="pedido">
      <div className="mx-auto max-w-[640px] px-8">
        <DogOrderForm />
      </div>
    </section>
  );
}
