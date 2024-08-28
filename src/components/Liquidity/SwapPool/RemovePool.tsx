export default function RemovePool() {
  return (
    <>
      <div className="warning-remove">
        Tip: Removing pool tokens converts your position back into underlying
        tokens at the current rate, proportional to your share of the pool.
        Accrued fees are included in the amounts you receive.
      </div>
      <div>POOL</div>
    </>
  );
}
