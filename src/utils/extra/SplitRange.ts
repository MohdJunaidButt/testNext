export default function SplitRange(range: string) {
  if (!range) return { from: undefined, to: undefined };
  let rangeArray = range.split('-');

  return {
    from: rangeArray.length > 0 ? rangeArray[0] : undefined,
    to: rangeArray[1].length > 0 ? rangeArray[1] : undefined,
  };
}
