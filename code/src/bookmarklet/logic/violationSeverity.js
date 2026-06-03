export const VIOLATION_SEVERITY_MAP = {
	critical: { label: 'Critical', color: '#c41e3a', bgColor: '#ffe0e0' },
	required: { label: 'Required', color: '#f9a825', bgColor: '#fff8e0' },
	check: { label: 'Check', color: '#330D2B', bgColor: '#DECADC' },
	unknown: { label: 'Unknown', color: '#666', bgColor: '#f5f5f5' }
};

export function getViolationSeverity(violation) {
	if (violation.impact === 'critical' || violation.impact === 'serious') {
		return { type: 'critical', ...VIOLATION_SEVERITY_MAP.critical };
	}
	if (violation.impact === 'moderate' || violation.impact === 'minor') {
		return { type: 'required', ...VIOLATION_SEVERITY_MAP.required };
	}
	if (violation.impact === 'check') {
		return { type: 'check', ...VIOLATION_SEVERITY_MAP.check };
	}
	return { type: 'unknown', ...VIOLATION_SEVERITY_MAP.unknown };
}
