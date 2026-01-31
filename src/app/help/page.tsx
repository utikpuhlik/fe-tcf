import type { Metadata } from "next";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { generateMeta } from "@/lib/utils";

const faqs = [
	{
		question: "Отмена заказа и внесение изменений",
		answer:
			"Вы можете отменить заказ или внести изменения, если он ещё не был перенаправлен в службу доставки. Для этого свяжитесь с нами по телефону или электронной почте.",
	},
	{
		question: "Возврат денежных средств",
		answer:
			"Cрок возврата денежных средств зависит от вида оплаты, который изначально выбрал покупатель.\n" +
			"\n" +
			"При наличном расчете возврат денежных средств осуществляется на кассе не позднее через через 10 дней после предъявления покупателем требования о возврате.\n" +
			"\n" +
			"Зачисление стоимости товара на карту клиента, если был использован безналичный расчёт, происходит сразу после получения требования от покупателя.\n" +
			"\n" +
			"При использовании электронных платёжных систем, возврат осуществляется на электронный счёт в течение 10 календарных дней.",
	},
	{
		question: "С какого момента начинается гарантия?",
		answer:
			"с момента передачи товара потребителю, если в договоре нет уточнения;\n" +
			"если нет возможности установить день покупки, то гарантия идёт с момента изготовления;\n" +
			"на сезонные товары гарантия идёт с момента начала сезона;\n" +
			"при заказе товара из интернет-магазина гарантия начинается со дня доставки.",
	},
];

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		title: "Помощь",
		description: "Ответы на часто задаваемые вопросы (FAQ)",
		canonical: "/help",
	});
}

export default function CenterAlignedWithActiveBackgroundGray() {
	return (
		<div className="container mx-auto px-4">
			{/* Title */}
			<div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
				<h1 className="font-semibold text-2xl md:text-4xl md:leading-tight">
					Часто задаваемые вопросы
				</h1>
				<p className="mt-1 text-muted-foreground">
					Если ваш вопрос не был освещен здесь, пожалуйста, свяжитесь с нами по
					телефону или электронной почте.
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
