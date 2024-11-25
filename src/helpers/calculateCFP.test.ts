import { calculateCFP } from "./calculateCFP"
import { mockAttributes, mockEmptyAttributes } from "./mockAttributes"

describe('Calculate CFP INS', () => {
	it('should calculate CFP correctly', () => {
		const result = calculateCFP(mockAttributes);
		expect(result).toBe(10);
	})
	it('should handle edge cases correctly', () => {
    const result = calculateCFP(mockEmptyAttributes);
    expect(result).toBe(0); 
  });
})