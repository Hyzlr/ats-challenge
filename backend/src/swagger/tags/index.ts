// lib
import { DocumentBuilder } from '@nestjs/swagger';

export const prepareAndApplyTags = (
  documentBuilderInstance: DocumentBuilder,
): DocumentBuilder => {
  for (let i = 0; i < 10; i++) {
    documentBuilderInstance.addTag(i.toString(), i.toString());
  }

  return documentBuilderInstance;
};
