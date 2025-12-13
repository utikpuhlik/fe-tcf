import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "Can I cancel at anytime?",
		answer:
			"Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.",
	},
	{
		question: "My team has credits. How do we use them?",
		answer:
			"Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.",
	},
	{
		question: "How does Acme's pricing work?",
		answer:
			"Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.",
	},
	{
		question: "How secure is Acme?",
		answer:
			"Protecting the data you trust to Acme is our first priority. This part is really crucial in keeping the project in line to completion.",
	},
	{
		question: "How do I get access to a theme I purchased?",
		answer:
			"If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.",
	},
	{
		question: "Upgrade License Type",
		answer:
			"There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.",
	},
];

export default function CenterAlignedWithActiveBackgroundGray() {
	return (
		<div className="container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
			{/* Title */}
			<div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
				<h2 className="font-bold text-2xl md:text-4xl md:leading-tight">
					Your questions, answered
				</h2>
				<p className="mt-1 text-muted-foreground">
					Answers to the most frequently asked questions.
				</p>
			</div>
			{/* End Title */}

			<div className="mx-auto max-w-2xl">
				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq, index) => (
						<AccordionItem value={`item-${index}`} key={faq.question}>
							<AccordionTrigger className="text-left font-semibold text-lg">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-base text-muted-foreground">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
}
