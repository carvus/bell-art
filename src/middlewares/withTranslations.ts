import { TMiddleware } from "../lib/types";
import { _WRONG_PARAMS_ } from "../helpers/error-codes";
const allowedLanguages = [`am`, `en`, `ru`]

const withTranslations: TMiddleware = (req, res, next) => {
    const currentLanguage = req.headers.language;
    if (!currentLanguage || !allowedLanguages.includes(currentLanguage as string))
        throw _WRONG_PARAMS_;

    next();
}

export default withTranslations;