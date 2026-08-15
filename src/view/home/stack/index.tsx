import { getCodeLanguageIcon, STACK_ICONS } from "@/components/custom/icons";
import { SectionHeader } from "@/components/custom/section-header";
import { Badge } from "@/components/ui/badge";
import settings from "@/lib/settings";

export default function Stack() {
  const { stack, pages } = settings;
  const { heading, description } = pages.stack;

  return (
    <section className="relative flex flex-col">
      <SectionHeader heading={heading} description={description} />

      <div className="mx-6 mb-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card/40 shadow-soft">
        {stack.map((category) => {
          const isLanguage = category.label === "Language";

          return (
            <div
              key={category.id}
              className="grid gap-3 p-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-baseline sm:gap-4"
            >
              <h3 className="font-pixel text-xs text-muted-foreground">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => {
                  const Icon = isLanguage
                    ? getCodeLanguageIcon(item).Icon
                    : (STACK_ICONS[item] ?? null);

                  return (
                    <Badge key={item} variant="secondary">
                      {Icon ? (
                        <Icon data-icon="inline-start" color="currentColor" />
                      ) : null}
                      {item}
                    </Badge>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
