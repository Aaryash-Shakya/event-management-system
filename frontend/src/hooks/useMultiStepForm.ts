import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStep, setCurrentStep] = useState<number>(0);

	function next() {
		setCurrentStep((i: number) => {
			if (i >= steps.length - 1) return i;
			return i + 1;
		});
	}

	function prev() {
		setCurrentStep((i: number) => {
			if (i <= 0) return i;
			return i - 1;
		});
	}

	return {
		currentStep,
		step: steps[currentStep],
		steps,
		isFirstStep: currentStep === 0,
		isLastStep: currentStep === steps.length - 1,
		prev,
		next,
	};
}
