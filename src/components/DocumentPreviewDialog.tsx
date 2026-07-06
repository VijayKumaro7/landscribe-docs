import { useEffect, useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation, type Translations } from "@/i18n";
import { downloadFile } from "@/lib/download";

interface PreviewStrings {
  demoNotice: string;
  download: string;
  openInTab: string;
  loading: string;
}

const previewT: Translations<PreviewStrings> = {
  en: { demoNotice: "Demo document with fictional data — for preview purposes only.", download: "Download PDF", openInTab: "Open in new tab", loading: "Loading preview…" },
  hi: { demoNotice: "काल्पनिक डेटा वाला डेमो दस्तावेज़ — केवल पूर्वावलोकन हेतु।", download: "PDF डाउनलोड करें", openInTab: "नए टैब में खोलें", loading: "पूर्वावलोकन लोड हो रहा है…" },
  kn: { demoNotice: "ಕಾಲ್ಪನಿಕ ಡೇಟಾದೊಂದಿಗೆ ಡೆಮೊ ದಾಖಲೆ — ಪೂರ್ವವೀಕ್ಷಣೆಗೆ ಮಾತ್ರ.", download: "PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ", openInTab: "ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ", loading: "ಪೂರ್ವವೀಕ್ಷಣೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ…" },
  mr: { demoNotice: "काल्पनिक डेटासह डेमो दस्तऐवज — केवळ पूर्वावलोकनासाठी.", download: "PDF डाउनलोड करा", openInTab: "नवीन टॅबमध्ये उघडा", loading: "पूर्वावलोकन लोड होत आहे…" },
  ta: { demoNotice: "கற்பனை தரவுகளுடன் கூடிய டெமோ ஆவணம் — முன்னோட்டத்திற்காக மட்டும்.", download: "PDF பதிவிறக்கு", openInTab: "புதிய தாவலில் திற", loading: "முன்னோட்டம் ஏற்றப்படுகிறது…" },
  te: { demoNotice: "కల్పిత డేటాతో డెమో పత్రం — ప్రివ్యూ కోసం మాత్రమే.", download: "PDF డౌన్లోడ్ చేయండి", openInTab: "కొత్త ట్యాబ్‌లో తెరవండి", loading: "ప్రివ్యూ లోడ్ అవుతోంది…" },
};

interface DocumentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string | null;
  downloadName?: string;
}

export const DocumentPreviewDialog = ({ open, onOpenChange, title, url, downloadName }: DocumentPreviewDialogProps) => {
  const t = useTranslation(previewT);
  const [loaded, setLoaded] = useState(false);

  // Reset the loading indicator whenever a different document is shown.
  useEffect(() => {
    setLoaded(false);
  }, [url, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] h-[85vh] flex flex-col p-4 sm:p-6 gap-3">
        <DialogHeader className="shrink-0 text-left space-y-1">
          <DialogTitle className="font-serif text-lg sm:text-xl pr-8">{title}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">{t.demoNotice}</DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 min-h-0 border border-border bg-muted/40 rounded-sm overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
              <span className="font-sans text-sm">{t.loading}</span>
            </div>
          )}
          {url && (
            <iframe
              key={url}
              src={url}
              title={title}
              className={`w-full h-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
            />
          )}
        </div>

        <div className="shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button
            variant="outline"
            className="rounded-sm font-sans text-sm"
            onClick={() => url && window.open(url, "_blank", "noopener")}
          >
            <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.openInTab}
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm font-sans text-sm"
            onClick={() => url && downloadFile(url, downloadName)}
          >
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.download}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
