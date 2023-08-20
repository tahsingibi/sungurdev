import { PageWrapper } from '@/components';

export default function AboutPage() {

    const Headline = PageWrapper.Headline;
    const Title = PageWrapper.Title;
    const Description = PageWrapper.Description;

    return (
        <PageWrapper>
            <Headline>
                <Title>Hakkımda</Title>
                <Description>Merhaba, ben <b>Tahsin Sungur</b>.</Description>
                <Description>
                    İzmir&apos;de yaşıyorum, 28 yaşındayım. Freelance olarak uzun zamandır grafik tasarım ve yazılım alanlarında çalışmalar yapıyorum. Hobi olarak mobil fotoğrafçılık, renklendirme, video çekme ve kurgulama işleriyle ilgileniyorum.
                </Description>
                <Description>Kod yazmanın verdiği hazdan ve bunu tam zamanlı bir işe çevirme isteğimden ötürü frontend alanında kendimi geliştirmeye daha çok zaman ayırıyorum. 2012&apos;den bu yana hobi & freelance olarak sürdürdüğüm frontend developer kariyerime 2022 Ekim ayından itibaren resmi olarak Mallconomy şirketinde devam ediyorum.</Description>
            </Headline>
        </PageWrapper >
    )
}
